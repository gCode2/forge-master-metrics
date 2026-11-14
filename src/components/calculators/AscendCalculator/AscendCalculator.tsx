import { useEffect, useState } from "react";
import type { AscendCalculatorState, AscendResource, LevelWithChances } from "../../../types/types";
import { ascendResources } from "../../../data/ascend";
import NumberField from "../components/NumberField";
import { forgeLevels } from "../../../data/resourceData";

const DEFAULT_STATE: AscendCalculatorState = {
    selectedResource: "Forge",
    resourceQuantities: {
        "qty-Forge": 0,
        "qty-Skills": 0,
        "qty-Pets": 0,
        "qty-Mounts": 0,
    },
    resourceCosts: {
        "cost-Skills": ascendResources[1].defaultCost,
        "cost-Pets": ascendResources[2].defaultCost,
        "cost-Mounts": ascendResources[3].defaultCost,
    },
    resourceBonuses: {
        "bonus-decrease-Forge": 0,
        "bonus-speed-Forge": 0,
        "bonus-chance-Pets": 0,
        "bonus-chance-Mounts": 0
    }
}

// const STORAGE_KEY = "ascend-calculator";

function AscendCalculator(){
    const [calculatorState, setCalculatorState] = useState<AscendCalculatorState>(DEFAULT_STATE);
    const [isConfirmingReset, setConfirmingReset] = useState(false);


    const selectedResource = ascendResources.find(res=>res.resource === calculatorState.selectedResource);

    useEffect(()=>{
        if(isConfirmingReset){
            const timer = setTimeout(()=>{
                setConfirmingReset(false);
            }, 3000)
            return ()=> clearTimeout(timer);
        }
    }, [isConfirmingReset])

    function toNonNegativeInteger(value: number) {
        return Number.isFinite(value)
            ? Math.max(0, Math.floor(value))
            : 0;
    }

    function handleQuantityChange(key:string, value: number){
        setCalculatorState(prev=>({
            ...prev,
            resourceQuantities: {
                ...prev.resourceQuantities,
                [key]: toNonNegativeInteger(value)
            }
        }))
    }

    function getResourceQuantity(key:string, defaultVal: number = 0){
        return calculatorState.resourceQuantities[key] ?? defaultVal;
    }

    function getResourceCost(key: string, resource: AscendResource){
        const defaultValue = resource.defaultCost;
        return calculatorState.resourceCosts[key] ?? defaultValue;
    }

    function handleCostChange(key: string, value: number){
        setCalculatorState(prev=>({
            ...prev,
            resourceCosts:{
                ...prev.resourceCosts,
                [key]: toNonNegativeInteger(value)
            }
        }))
    }

    function handleBonusesChange(key: string, value: number){
        setCalculatorState(prev=>({
            ...prev,
            resourceBonuses:{
                ...prev.resourceBonuses,
                [key]: toNonNegativeInteger(value)
            }
        }))
    }

    function getResourceBonuses(key: string, defaultVal: number = 0){
        return calculatorState.resourceBonuses[key] ?? defaultVal;
    }

    function getEstimatedSkillSummons(){
        const tickets = calculatorState.resourceQuantities["qty-Skills"];
        const cost = calculatorState.resourceCosts["cost-Skills"];

        const summons = Math.floor(tickets / cost);
        return summons;
    }
    function getEstimatedPetSummons(){
        const eggs = calculatorState.resourceQuantities["qty-Pets"];
        const cost = calculatorState.resourceCosts["cost-Pets"];
        const extraChance = calculatorState.resourceBonuses["bonus-chance-Pets"] ?? 0;

        const actions = cost > 0 ? Math.floor(eggs / cost) : 0;
        const expectedSummons = Math.floor(actions * (1 + extraChance / 100));
        return {actions, expectedSummons}
    }

    function getEstimatedMountSummons(){
        const clockwiders = calculatorState.resourceQuantities["qty-Mounts"];
        const cost = calculatorState.resourceCosts["cost-Mounts"];
        const extraChance = calculatorState.resourceBonuses["bonus-chance-Mounts"] ?? 0;

        const actions = cost > 0 ? Math.floor(clockwiders / cost) : 0;
        const expectedSummons = Math.floor(actions * (1 + extraChance / 100));
        return {actions, expectedSummons}
    }

    function formatDuration(seconds: number) {
        const totalSeconds = Math.ceil(seconds);

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        const parts = [];

        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

        return parts.join(" ");
    }

    function getEstimatedForge() {
        const coins = calculatorState.resourceQuantities["qty-Forge"] ?? 0;

        const costDecrease = Math.min(
            100,
            calculatorState.resourceBonuses["bonus-decrease-Forge"] ?? 0
        );

        const timeSpeedup = Math.min(
            100,
            calculatorState.resourceBonuses["bonus-speed-Forge"] ?? 0
        );

        const levels = forgeLevels;

        let remainingCoins = coins;
        let currentLevel = levels[0].level;
        let totalTimeSeconds = 0;
        let upgradesCompleted = 0;
        let totalGemCost = 0;

        for (let i = 1; i < levels.length; i++) {
            const nextLevel = levels[i];

            if (nextLevel.totalCost === null) continue;

            const discountedCost = Math.ceil(
                nextLevel.totalCost * (1 - costDecrease / 100)
            );

            if (remainingCoins < discountedCost) break;

            remainingCoins -= discountedCost;

            currentLevel = nextLevel.level;
            upgradesCompleted++;
            totalGemCost += nextLevel.gemCost ?? 0;

            const upgradeTime = nextLevel.time ?? 0;

            totalTimeSeconds +=
                upgradeTime * (1 - timeSpeedup / 100);
        }

        const nextLevelIndex = levels.findIndex(
            item => item.level === currentLevel + 1
        );

        let progress = 0;
        let required: number | null = null;

        if (nextLevelIndex !== -1) {
            const nextLevel = levels[nextLevelIndex];

            const nextCost = Math.ceil(
                nextLevel.totalCost! * (1 - costDecrease / 100)
            );

            progress = Math.min(remainingCoins, nextCost);
            required = nextCost;
        }

        const current = levels.find(
            item => item.level === currentLevel
        );

        const rarities = Object.keys(levels[0].chances);

        const missChance: Record<string, number> = {};
        const expected: Record<string, number> = {};

        rarities.forEach(rarity => {
            missChance[rarity] = 1;
            expected[rarity] = 0;
        });

        for (let i = 1; i <= upgradesCompleted; i++) {
            const chances = levels[i].chances;

            rarities.forEach(rarity => {
                const chance = chances[
                    rarity as keyof typeof chances
                ];

                missChance[rarity] *= (1 - chance);
                expected[rarity] += chance;
            });
        }

        const atLeastOne: Record<string, number> = {};

        rarities.forEach(rarity => {
            atLeastOne[rarity] =
                (1 - missChance[rarity]) * 100;
        });

        return {
            level: currentLevel,
            progress,
            required,
            chances: current?.chances ?? {},
            totalTimeSeconds,
            remainingCoins,
            upgradesCompleted,
            totalGemCost,
            cumulativeChances: {
                atLeastOne,
                expected
            }
        };
    }

   function getMaxLevelForResource(
        resourceName: string,
        estimatedSummons: number,
        pointsPerSummon: number = 1
    ) {
        const resourceData = ascendResources.find(item => item.resource === resourceName);
        if (!resourceData) return null;

        const levels = resourceData.levels;
        const totalProgress = estimatedSummons * pointsPerSummon;

        const index = levels.findIndex(
            item => item.totalSummon === null || totalProgress < item.totalSummon
        );
        if (index === -1) return null;

        const current = levels[index];
        const previousTotal = levels[index - 1]?.totalSummon ?? 0;

        return {
            level: current.level,
            progress: totalProgress - previousTotal,
            required: current.totalSummon === null ? null : current.totalSummon - previousTotal,
            chances: current.chances,
            cumulativeChances: getCumulativeChances(levels, current.level, totalProgress)
        };
    }
    function getCumulativeChances(
        levels: LevelWithChances[],
        currentLevel: number,
        totalProgress: number
    ) {
        const rarities = Object.keys(levels[0].chances);
        const missChance: Record<string, number> = {};

        const expected: Record<string, number> = {};

        rarities.forEach(r => {
            missChance[r] = 1;
            expected[r] = 0;
        });

        let previousTotal = 0;

        for (const lvl of levels) {
            if (lvl.level > currentLevel) break;

            const pointsHere = lvl.level === currentLevel
                ? totalProgress - previousTotal
                : lvl.totalSummon! - previousTotal;

            const summons = pointsHere;

            rarities.forEach(r => {
                const p = lvl.chances[r as keyof typeof lvl.chances] / 100;
                missChance[r] *= Math.pow(1 - p, summons);
                expected[r] += summons * p;
            });

            previousTotal = lvl.totalSummon ?? previousTotal;
        }

        const atLeastOne: Record<string, number> = {};
        rarities.forEach(r => (atLeastOne[r] = (1 - missChance[r]) * 100));
        return {atLeastOne, expected}
    }

    

    const skillsAscend = getMaxLevelForResource("Skills", getEstimatedSkillSummons());

    const petsAscend = getMaxLevelForResource("Pets", getEstimatedPetSummons().expectedSummons);

    const mountsAscend = getMaxLevelForResource("Mounts", getEstimatedMountSummons().expectedSummons);
    
    const forgeAscend = getEstimatedForge();

    useEffect(()=>{
        console.log(calculatorState)
        getMaxLevelForResource("Skills", getEstimatedSkillSummons(), 5)
    }, [calculatorState])

    function renderResourceContent(resource: AscendResource){
        switch(resource.resource){
            case "Forge":
                return (
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-bold">
                            Forge
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <NumberField label="Coins:" value={getResourceQuantity(`qty-${resource.resource}`)} onChange={(value)=>{handleQuantityChange(`qty-${resource.resource}`, Math.max(0, Math.floor(Number(value) || 0)))}}/>
                            </div>
                            <div>
                                <NumberField label="Forge speed up (%):" value={getResourceBonuses(`bonus-speed-${resource.resource}`)} onChange={(value)=>{handleBonusesChange(`bonus-speed-${resource.resource}`, Math.max(0, Math.floor(Number(value) || 0)))}}/>
                            </div>
                            <div>
                                <NumberField label="Forge cost decrease (%):" value={getResourceBonuses(`bonus-decrease-${resource.resource}`)} onChange={(value)=>{handleBonusesChange(`bonus-decrease-${resource.resource}`, Math.max(0, Math.floor(Number(value) || 0)))}}/>
                            </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-3">
                                    <div className="font-bold text-xl">
                                        Summary
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                            <div className="flex flex-col w-full justify-center items-center">
                                                <div className="text-xl">
                                                    You'll reach
                                                    <span className="font-bold"> level {forgeAscend?.level}</span>
                                                </div>
                                                <div className="text-gray-800 text-xs">
                                                    {forgeAscend?.required === null
                                                        ? "(MAX level)"
                                                        : `(${forgeAscend?.progress}/${forgeAscend?.required} to level ${forgeAscend!.level + 1})`}
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                            <div className="flex flex-col w-full justify-center items-center">
                                                <div className="text-base">
                                                    Estimated time: <span className="font-bold"> 
                                                        {formatDuration(forgeAscend?.totalTimeSeconds ?? 0)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                            <div className="flex flex-col w-full justify-center items-center">
                                                <div className="text-base">
                                                    Gems to reach that level: <span className="font-bold"> 
                                                        {forgeAscend?.totalGemCost ?? 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                )
            case "Skills":
                return (
                        <div className="flex flex-col gap-3">
                            <div className="text-xl font-bold">
                                Skills
                            </div>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <NumberField label="Tickets:" value={getResourceQuantity(`qty-${resource.resource}`)} onChange={(value)=>{handleQuantityChange(`qty-${resource.resource}`, Math.max(0, Math.floor(Number(value) || 0)))}}/>
                                </div>
                                <div>
                                    <NumberField label="Summon cost:" value={getResourceCost(`cost-${resource.resource}`, resource)} onChange={(value)=>{handleCostChange(`cost-${resource.resource}`, Math.max(0, Math.floor(Number(value) || resource.defaultCost)))}}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-3">
                                    <div className="font-bold text-xl">
                                        Summary
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                            <div className="flex flex-col w-full justify-center items-center">
                                                <div className="text-xl">
                                                    You'll reach
                                                    <span className="font-bold"> level {skillsAscend?.level}</span>
                                                </div>
                                                <div className="text-gray-800 text-xs">
                                                    {skillsAscend?.required === null
                                                        ? "(MAX level)"
                                                        : `(${skillsAscend?.progress}/${skillsAscend?.required} to level ${skillsAscend!.level + 1})`}
                                                </div>
                                                
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                                {Object.entries(skillsAscend?.chances || {}).map(([key, value]) => {
                                                    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                    return (
                                                        <div
                                                            key={key}
                                                            className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                            grid grid-cols-[1fr_auto] items-center gap-2
                                                            w-full sm:w-auto sm:flex-none`}
                                                        >
                                                            <span className="text-left whitespace-nowrap">
                                                                {formattedKey}:
                                                            </span>

                                                            <span className="font-bold text-right whitespace-nowrap">
                                                                {value.toFixed(2)}%
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                            <div className="flex flex-col w-full justify-center items-center">
                                                <div className="text-xl font-bold">
                                                    Cumulative chances
                                                </div>
                                                <div className="text-xs text-center">
                                                Odds of getting certain drop rarities in the Ascension process
                                            </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                                {Object.entries(skillsAscend?.cumulativeChances.atLeastOne || {}).map(([key, value]) => {
                                                    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                    return (
                                                        <div
                                                            key={key}
                                                            className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                            grid grid-cols-[1fr_auto] items-center gap-2
                                                            w-full sm:w-auto sm:flex-none`}
                                                        >
                                                            <span className="text-left whitespace-nowrap">
                                                                {formattedKey}:
                                                            </span>

                                                            <span className="font-bold text-right whitespace-nowrap">
                                                                {value.toFixed(2)}%
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                            <div className="flex flex-col w-full justify-center items-center">
                                                <div className="text-xl font-bold">
                                                    Expected average drops
                                                </div>
                                                <div className="text-xs">
                                                    Per {getEstimatedSkillSummons()*5} summons ({getEstimatedSkillSummons()} actions)
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                                {Object.entries(skillsAscend?.cumulativeChances.expected || {}).map(([key, value]) => {
                                                    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                    return (
                                                        <div
                                                            key={key}
                                                            className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                            grid grid-cols-[1fr_auto] items-center gap-2
                                                            w-full sm:w-auto sm:flex-none`}
                                                        >
                                                            <span className="text-left whitespace-nowrap">
                                                                {formattedKey}:
                                                            </span>

                                                            <span className="font-bold text-right whitespace-nowrap">
                                                                {value.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            
                                        </div>

                                    </div>
                                    {/* <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-cyan-100 border-gray-500">
                                            <div className="flex flex-col w-full justify-center items-center">
                                                <div className="text-xl font-bold">
                                                    Info
                                                </div>
                                                <div className="text-xs text-center">
                                                Ascension review
                                            </div>
                                            </div>
                                            <div>
                                                If you don't want to lose power, you should get at least 3 legendary skills.
                                            </div>
                                            <div>
                                                Your current expected Legendary average drop: {skillsAscend?.cumulativeChances.expected.legendary}
                                            </div>
                                            <div>
                                                {skillsAscend?.cumulativeChances.expected.legendary! > 5 ? "You can ascend" : "Better gather more Skill Tickets"}
                                            </div>
                                        </div> */}
                                    </div>
                            </div>
                        </div>
                )
            case "Pets":
                return (
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-bold">
                            Pets
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <NumberField label="Eggs:" value={getResourceQuantity(`qty-${resource.resource}`)} onChange={(value)=>{handleQuantityChange(`qty-${resource.resource}`, Math.max(0, Math.floor(Number(value) || 0)))}}/>
                            </div>
                            <div>
                                <NumberField label="Summon cost:" value={getResourceCost(`cost-${resource.resource}`, resource)} onChange={(value)=>{handleCostChange(`cost-${resource.resource}`, Math.max(0, Math.floor(Number(value) || resource.defaultCost)))}}/>
                            </div>
                            <div>
                                <NumberField label="Extra chance (%):" value={getResourceBonuses(`bonus-chance-${resource.resource}`)} onChange={(value)=>{handleBonusesChange(`bonus-chance-${resource.resource}`, Math.max(0, Math.floor(Number(value) || 0)))}}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-3">
                                    <div className="font-bold text-xl">
                                        Summary
                                    </div>
                                    
                                    <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                        <div className="flex flex-col w-full justify-center items-center">
                                            <div className="text-xl">
                                                You'll reach
                                                <span className="font-bold"> level {petsAscend?.level}</span>
                                            </div>
                                            <div className="text-gray-800 text-xs">
                                                {petsAscend?.required === null
                                                    ? "(MAX level)"
                                                    : `(${petsAscend?.progress}/${petsAscend?.required} to level ${petsAscend!.level + 1})`}
                                            </div>
                                            
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                            {Object.entries(petsAscend?.chances || {}).map(([key, value]) => {
                                                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                return (
                                                    <div
                                                        key={key}
                                                        className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                        grid grid-cols-[1fr_auto] items-center gap-2
                                                        w-full sm:w-auto sm:flex-none`}
                                                    >
                                                        <span className="text-left whitespace-nowrap">
                                                            {formattedKey}:
                                                        </span>

                                                        <span className="font-bold text-right whitespace-nowrap">
                                                            {value.toFixed(2)}%
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                    </div>

                                    <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                        <div className="flex flex-col w-full justify-center items-center">
                                            <div className="text-xl font-bold">
                                                Cumulative chances
                                            </div>
                                            <div className="text-xs text-center">
                                                Odds of getting certain drop rarities in the Ascension process
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                            {Object.entries(petsAscend?.cumulativeChances.atLeastOne || {}).map(([key, value]) => {
                                                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                return (
                                                    <div
                                                        key={key}
                                                        className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                        grid grid-cols-[1fr_auto] items-center gap-2
                                                        w-full sm:w-auto sm:flex-none`}
                                                    >
                                                        <span className="text-left whitespace-nowrap">
                                                            {formattedKey}:
                                                        </span>

                                                        <span className="font-bold text-right whitespace-nowrap">
                                                            {value.toFixed(2)}%
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                        <div className="flex flex-col w-full justify-center items-center">
                                            <div className="text-xl font-bold">
                                                Expected average drops
                                            </div>
                                            <div className="text-xs">
                                        Per {getEstimatedPetSummons().expectedSummons} summons ({getEstimatedPetSummons().actions} actions)
                                    </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                            {Object.entries(petsAscend?.cumulativeChances.expected || {}).map(([key, value]) => {
                                                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                return (
                                                    <div
                                                        key={key}
                                                        className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                        grid grid-cols-[1fr_auto] items-center gap-2
                                                        w-full sm:w-auto sm:flex-none`}
                                                    >
                                                        <span className="text-left whitespace-nowrap">
                                                            {formattedKey}:
                                                        </span>

                                                        <span className="font-bold text-right whitespace-nowrap">
                                                            {value.toFixed(2)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                    </div>

                                </div>
                        </div>
                    </div>
                )
            case "Mounts":
                return (
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-bold">
                            Mounts
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <NumberField label="Clockwiders:" value={getResourceQuantity(`qty-${resource.resource}`)} onChange={(value)=>{handleQuantityChange(`qty-${resource.resource}`, Math.max(0, Math.floor(Number(value) || 0)))}}/>
                            </div>
                            <div>
                                <NumberField label="Summon cost:" value={getResourceCost(`cost-${resource.resource}`, resource)} onChange={(value)=>{handleCostChange(`cost-${resource.resource}`, Math.max(0, Math.floor(Number(value) || resource.defaultCost)))}}/>
                            </div>
                            <div>
                                <NumberField label="Extra chance (%):" value={getResourceBonuses(`bonus-chance-${resource.resource}`)} onChange={(value)=>{handleBonusesChange(`bonus-chance-${resource.resource}`, Math.max(0, Math.floor(Number(value) || 0)))}}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-3">
                                    <div className="font-bold text-xl">
                                        Summary
                                    </div>
                                    
                                    <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                        <div className="flex flex-col w-full justify-center items-center">
                                            <div className="text-xl">
                                                You'll reach
                                                <span className="font-bold"> level {mountsAscend?.level}</span>
                                            </div>
                                            <div className="text-gray-800 text-xs">
                                                {mountsAscend?.required === null
                                                    ? "(MAX level)"
                                                    : `(${mountsAscend?.progress}/${mountsAscend?.required} to level ${mountsAscend!.level + 1})`}
                                            </div>
                                            
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                            {Object.entries(mountsAscend?.chances || {}).map(([key, value]) => {
                                                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                return (
                                                    <div
                                                        key={key}
                                                        className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                        grid grid-cols-[1fr_auto] items-center gap-2
                                                        w-full sm:w-auto sm:flex-none`}
                                                    >
                                                        <span className="text-left whitespace-nowrap">
                                                            {formattedKey}:
                                                        </span>

                                                        <span className="font-bold text-right whitespace-nowrap">
                                                            {value.toFixed(2)}%
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                    </div>

                                    <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                        <div className="flex flex-col w-full justify-center items-center">
                                            <div className="text-xl font-bold">
                                                Cumulative chances
                                            </div>
                                            <div className="text-xs text-center">
                                                Odds of getting certain drop rarities in the Ascension process
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                            {Object.entries(mountsAscend?.cumulativeChances.atLeastOne || {}).map(([key, value]) => {
                                                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                return (
                                                    <div
                                                        key={key}
                                                        className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                        grid grid-cols-[1fr_auto] items-center gap-2
                                                        w-full sm:w-auto sm:flex-none`}
                                                    >
                                                        <span className="text-left whitespace-nowrap">
                                                            {formattedKey}:
                                                        </span>

                                                        <span className="font-bold text-right whitespace-nowrap">
                                                            {value.toFixed(2)}%
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
                                        <div className="flex flex-col w-full justify-center items-center">
                                            <div className="text-xl font-bold">
                                                Expected average drops
                                            </div>
                                            <div className="text-xs">
                                        Per {getEstimatedMountSummons().expectedSummons} summons ({getEstimatedMountSummons().actions} actions)
                                    </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
                                            {Object.entries(mountsAscend?.cumulativeChances.expected || {}).map(([key, value]) => {
                                                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                return (
                                                    <div
                                                        key={key}
                                                        className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                        grid grid-cols-[1fr_auto] items-center gap-2
                                                        w-full sm:w-auto sm:flex-none`}
                                                    >
                                                        <span className="text-left whitespace-nowrap">
                                                            {formattedKey}:
                                                        </span>

                                                        <span className="font-bold text-right whitespace-nowrap">
                                                            {value.toFixed(2)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                    </div>

                                </div>
                        </div>
                    </div>
                )
            default:
                return (
                    <div>
                        <div className="text-xl font-bold">
                            Something went wrong.
                        </div>
                        <div className="text-base">
                            Provided wrong resource. Refresh and try again.
                        </div>
                    </div>
                )
        }
    }

    return (
        <>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row justify-start items-center gap-5 w-full">
                    <div className="h-16 w-16 sm:h-25 sm:w-25 shrink-0">
                        <img src="/icons/ascend.png" className="h-16 w-16 sm:h-25 sm:w-25 shrink-0"/>
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold">
                            Ascend Calculator
                        </div>
                        <div className="text-sm text-zinc-500">
                            Find out how much you need to upgrade and what resources are required for your next ascension.
                        </div>
                    </div>
                </div>
                <div className="mt-6 w-full">
                    <section className="flex flex-col gap-4 sm:gap-5 text-sm min-w-0 w-full">
                        <div className="border-2 rounded-md p-3 flex flex-col gap-4 shadow-lg/20">
                            <div className="text-xl font-bold text-center sm:text-left">
                                Select Ascension
                            </div>
                            <div className="grid grid-cols-4 sm:flex sm:flex-row gap-2 sm:gap-2 items-center justify-center">
                            {ascendResources.map((resource) => (
                                    
                                        <button
                                        type="button"
                                        key={resource.id}
                                        className={`
                                        flex flex-row justify-around items-center
                                        text-white font-medium py-1 px-1 sm:px-2
                                        transition duration-200 sm:w-21
                                        rounded ring-1 ring-black border-b-4
                                        text-[10px] hover:cursor-pointer
                                        ${calculatorState.selectedResource === resource.resource
                                            ? "bg-orange-400 border-orange-500 hover:bg-orange-300 hover:border-orange-400"
                                            : "bg-gray-400 border-gray-500 hover:bg-gray-300 hover:border-gray-400"}
                                        `}
                                        onClick={() => setCalculatorState(prev=>({
                                            ...prev,
                                            selectedResource: resource.resource
                                        }))}>
                                            <div className="flex flex-row items-center justify-center gap-1 w-full h-6">
                                                <div
                                                    className="w-6 h-6 shrink-0"
                                                    style={{
                                                        backgroundImage: "url('/icons/ICONS.png')",
                                                        backgroundSize: "186px 186px",
                                                        backgroundPosition: `${
                                                            resource.resource === "Forge" ? "-23px 1px" :
                                                            resource.resource === "Skills" ? "-162px 1px" :
                                                            resource.resource === "Pets" ? "-23px -92px" :
                                                            resource.resource === "Mounts" ? "-93px -69px" : "0px 0px"
                                                        }`,
                                                        backgroundRepeat: "no-repeat",
                                                    }}
                                                />

                                                <div className="flex items-center justify-center h-full leading-none">
                                                    {resource.resource}
                                                </div>
                                            </div>
                                        </button>
                                    
                                ))}
                                </div>
                            <div className="flex flex-col gap-3">
                                {selectedResource ? renderResourceContent(selectedResource) : <div>Something went wrong. Try again later.</div>}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default AscendCalculator;