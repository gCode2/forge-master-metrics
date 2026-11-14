import { useEffect, useState } from "react";
import type { AscendCalculatorState, AscendResource } from "../../../types/types";
import { ascendResources } from "../../../data/ascend";
import NumberField from "../components/NumberField";

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
            chances: current.chances
        };
    }

    const skillsAscend = getMaxLevelForResource("Skills", getEstimatedSkillSummons(), 5);
    
    useEffect(()=>{
        console.log(calculatorState)
        getMaxLevelForResource("Skills", getEstimatedSkillSummons(), 5)
    }, [calculatorState])

    function renderResourceContent(resource: AscendResource){
        switch(resource.resource){
            case "Forge":
                return (
                    <div>
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
                            <div>
                                Using gems?
                                slider
                            </div>
                            </div>
                            <div>
                                Summary + info
                            </div>
                        </div>
                )
            case "Skills":
                return (
                        <div>
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
                                <div>
                                    <div className="font-bold text-xl">
                                        Summary
                                    </div>
                                    {/* <div>
                                        You can summon skills {getEstimatedSkillSummons()} times
                                    </div> */}
                                    <div className="flex flex-col gap-3 border-1 p-3 rounded-md">
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
                                        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
                                            {Object.entries(skillsAscend?.chances || {}).map(([key, value]) => {
                                                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                                return (
                                                    <div
                                                        key={key}
                                                        className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                                                        grid grid-cols-[1fr_40px] items-center gap-1
                                                        w-full sm:w-auto sm:flex-none`}
                                                    >
                                                        <span className="text-left whitespace-nowrap">
                                                            {formattedKey}:
                                                        </span>

                                                        <span className="font-bold text-right whitespace-nowrap">
                                                            {value}%
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
            case "Pets":
                return (
                    <div>
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
                            Summary
                        </div>
                    </div>
                )
            case "Mounts":
                return (
                    <div>
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
                            Summary
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