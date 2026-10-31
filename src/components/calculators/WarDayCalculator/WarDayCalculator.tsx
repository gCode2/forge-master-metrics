import { useEffect, useState } from "react";
import { forgeLevels, warActions, warDaysActions } from "../../../data/warDay";
import NumberField from "./components/NumberField";
import SectionSummary from "./components/SectionSummary";
import { formatPoints } from "./utils";
import type { CalculatorState } from "../../../types/types";

type WarGroup = (typeof warActions)[number];

const FORGE_TIERS = [
    { key: "forge-tier-1", title: "Primitive / Medieval / Early Modern", names: ["Primitive", "Medieval", "Early Modern"], defaultPoints: 1 },
    { key: "forge-tier-2", title: "Modern / Space / Interstellar", names: ["Modern", "Space", "Interstellar"], defaultPoints: 2 },
    { key: "forge-tier-3", title: "Multiverse / Quantum / Underworld / Divine", names: ["Multiverse", "Quantum", "Underworld", "Divine"], defaultPoints: 3 },
];

const FORGE_CHANCE_KEYS = {
    Primitive: "primitive",
    Medieval: "medieval",
    "Early Modern": "earlyModern",
    Modern: "modern",
    Space: "space",
    Interstellar: "interstellar",
    Multiverse: "multiverse",
    Quantum: "quantum",
    Underworld: "underworld",
    Divine: "divine",
} as const;


const DEFAULT_STATE: CalculatorState = {
    selectedDay: 1,
    quantities: {},
    customPoints: {},
    specialSettings: {
        mountExtraChance: 0,
        forgeExtraChance: 0,
    },
    selectedForgeLevel: 1,
    showAdvancedMode: true,
}
const STORAGE_KEY = "war-day-calculator";

const inputClass = "border px-1 w-25 rounded-sm";

function getSpendUnitSize(actionName: string) {
    const match = actionName.match(/Spend (\d+)/);
    return match ? Number(match[1]) : 1;
}

function WarDayCalculator() {
    const [calculatorState, setCalculatorState] = useState<CalculatorState>(()=>{
        if(typeof window === "undefined") {
            return DEFAULT_STATE;
        }
        try{
            const saved = localStorage.getItem(STORAGE_KEY);
            if(!saved) return DEFAULT_STATE;

            return {
                ...DEFAULT_STATE,
                ...JSON.parse(saved)
            }

        }
        catch{
            return DEFAULT_STATE;
        }
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(calculatorState)
            );
        }, 200);

        return () => clearTimeout(timeout);
    }, [calculatorState]);

    const daysIds = warDaysActions[calculatorState.selectedDay - 1] || [];

    const selectedForge = forgeLevels.find(level => level.level === calculatorState.selectedForgeLevel) ?? forgeLevels[0];

    const filteredActions = daysIds
    .map(id => warActions.find(actionGroup => actionGroup.id === id))
    .filter((group): group is WarGroup => group !== undefined);

    function handleDayChange(dayNumber: number) {
        setCalculatorState(prev => ({
            ...prev,
            selectedDay: dayNumber,
        }));
    }

    function dayKey(key: string, day = calculatorState.selectedDay) {
        return `day${day}:${key}`;
    }

    function getQty(key: string, defaultVal: number = 0, day = calculatorState.selectedDay) {
        return calculatorState.quantities[dayKey(key, day)] ?? defaultVal;
    }

    function toNonNegativeInteger(value: number) {
        return Number.isFinite(value)
            ? Math.max(0, Math.floor(value))
            : 0;
    }

    function handleQuantityChange(key: string, value: number) {
        const fullKey = dayKey(key);

        setCalculatorState(prev => ({
            ...prev,
            quantities: {
                ...prev.quantities,
                [fullKey]: toNonNegativeInteger(value),
            },
        }));
    }

    function handlePointsChange(key: string, value: number) {
        setCalculatorState(prev => ({
            ...prev,
            customPoints: {
                ...prev.customPoints,
                [key]: toNonNegativeInteger(value),
            },
        }));
    }

    function getPoints(key: string, defaultValue: number){
        return calculatorState.customPoints[key] !== undefined ? calculatorState.customPoints[key] : defaultValue;
    }

    function handleSettingChange(key: string, value: number) {
        setCalculatorState(prev => ({
            ...prev,
            specialSettings: {
                ...prev.specialSettings,
                [key]: toNonNegativeInteger(value),
            },
        }));
    }

    function getCost(key: string, defaultVal: number = 1){
        return calculatorState.specialSettings[key] !== undefined ? calculatorState.specialSettings[key] : defaultVal;
    }

    function getExpectedMounts(day = calculatorState.selectedDay) {
        const mountGroup = warActions.find(g => g.id === 5);
        const defaultCost = (mountGroup as any)?.defaultCost ?? 1;
        const keys = getQty("mount-keys-qty", 0, day);
        const cost = getCost("mountCost", defaultCost);
        const chance = calculatorState.specialSettings.mountExtraChance ?? 0;
        const summons = cost > 0 ? Math.floor(keys / cost) : 0;
        return Math.floor(summons * (1 + chance / 100));
    }

    function getGroupSummary(group: WarGroup, day = calculatorState.selectedDay): { points: number; detail?: string } {
        const customAct = group.customAction;
        const actionList = group.actions || [];
        const groupDefaultCost = (group as any).defaultCost ?? 1;

        switch (group.id) {
            case 1: {
                const hammers = getQty("forge-hammers",0,day);
                const extraChance = calculatorState.specialSettings.forgeExtraChance ?? 0;

                const chance = extraChance / 100;

                const expectedForges = chance < 1 ? hammers / (1-chance) : hammers;


                const expectedPointsPerHammer = actionList.reduce((sum, act) => {
                    const chanceKey = FORGE_CHANCE_KEYS[
                        act.name as keyof typeof FORGE_CHANCE_KEYS
                    ];

                    if(!chanceKey){
                        return sum;
                    }

                    const tier = FORGE_TIERS.find(item=>item.names.includes(act.name));

                    if(!tier) {
                        return sum;
                    }
                    const chance = selectedForge.forgeChances[chanceKey];
                    const points = getPoints(tier.key, tier.defaultPoints);
                    return sum + chance * points;

                }, 0)

                return {
                    points: Math.floor(expectedForges * expectedPointsPerHammer),
                    detail:
                        `Est. ${formatPoints(Math.floor(expectedForges))} hammers × ${formatPoints(expectedPointsPerHammer)} expected pts per hammer` + ` (Forge level ${selectedForge.level})`
                };
            }
            case 2: {
                const keys = getQty("dungeon-keys", 8, day);
                const pts = getPoints("dungeon-pts", customAct?.defaultPoints ?? 0);
                return { points: keys * pts, detail: `${formatPoints(keys)} dungeons × ${formatPoints(pts)} pts` };
            }
            case 3: {
                const total = actionList.reduce((sum, act) =>
                    sum + getQty(`egg-qty-${act.name}`,0,day) * getPoints(`egg-pts-${act.name}`, act.defaultPoints), 0,);
                return { points: total };
            }
            case 4: {
                const qty = getQty("merge-pets-qty",0,day);
                const pts = getPoints("merge-pets-pts", customAct?.defaultPoints ?? 0);
                return { points: qty * pts, detail: `${formatPoints(qty)} merges × ${formatPoints(pts)} pts` };
            }
            case 5: {
                const keys = getQty("mount-keys-qty",0,day);
                const cost = getCost("mountCost", groupDefaultCost);
                const chance = calculatorState.specialSettings.mountExtraChance ?? 0;
                const pts = getPoints("mount-pts", customAct?.defaultPoints ?? 0);
                const summons = cost > 0 ? Math.floor(keys / cost) : 0;
                const expectedMounts = getExpectedMounts(day);
                return {
                    points: expectedMounts * pts,
                    detail: `${formatPoints(summons)} summons → ~${formatPoints(expectedMounts)} mounts (incl. ${formatPoints(chance)}% extra chance) × ${formatPoints(pts)} pts`,
                };
            }
            case 6: {
                const qty = getQty("merge-mounts-qty", Math.floor(getExpectedMounts()),day);
                const pts = getPoints("merge-mounts-pts", customAct?.defaultPoints ?? 0);
                return { points: qty * pts, detail: `${formatPoints(qty)} merges × ${formatPoints(pts)} pts` };
            }
            case 7: {
                const total = actionList.reduce((sum, act) =>
                    sum + getQty(`tech-qty-${act.name}`,0,day) * getPoints(`tech-pts-${act.name}`, act.defaultPoints), 0);
                return { points: total };
            }
            case 8: {
                const total = actionList.reduce((sum, act) => {
                    const amount = getQty(`spend-qty-${act.name}`,0,day);
                    const pts = getPoints(`spend-pts-${act.name}`, act.defaultPoints);
                    const units = Math.floor(amount / getSpendUnitSize(act.name));
                    return sum + units * pts;
                }, 0);
                return { points: total };
            }
            case 9: {
                const tickets = getQty("skill-tickets-qty",0,day);
                const cost = getCost("skillCost", groupDefaultCost);
                const pts = getPoints("skill-summon-pts", customAct?.defaultPoints ?? 0);
                const summons = cost > 0 ? Math.floor(tickets / cost) : 0;
                const skills = summons * 5;
                return {
                    points: skills * pts,
                    detail: `${formatPoints(summons)} summons × 5 skills × ${formatPoints(pts)} pts`,
                };
            }
            case 10: {
                const qty = getQty("skill-upgrade-qty",0,day);
                const pts = getPoints("skill-upgrade-pts", customAct?.defaultPoints ?? 0);
                return { points: qty * pts, detail: `${formatPoints(qty)} upgrades × ${formatPoints(pts)} pts` };
            }
            default:
                return { points: 0 };
        }
    }

    const totalPoints = filteredActions.reduce((sum, group) => sum + getGroupSummary(group).points, 0);

    const totalWarPoints = warDaysActions.reduce((total, dayActions, index) => {
    const dayNumber = index + 1;

    const dayGroups = dayActions
        .map(id => warActions.find(group => group.id === id))
        .filter((group): group is WarGroup => group !== undefined);

    const dayPoints = dayGroups.reduce(
        (sum, group) => sum + getGroupSummary(group, dayNumber).points,
        0
    );

        return total + dayPoints;
    }, 0);

    return (
        <section className="flex flex-col gap-4 sm:gap-5 text-sm min-w-0 w-full">
            <div className="
                flex flex-col sm:flex-row
                items-start sm:items-center
                justify-between gap-3
                border-2 rounded-lg p-3 bg-gray-50
            ">
                <div className="font-bold text-lg sm:text-xl flex flex-col">
                    <div>
                        Calculator mode
                    </div>
                    
                    <div className="text-zinc-500 text-xs sm:text-sm font-normal">
                        {calculatorState.showAdvancedMode ? "Seems too complicated? Switch to Simple Mode" : "To specify more details (i.e. extra drop chances or forge level) enable the Advanced Mode"}
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 self-center sm:self-auto shrink-0">
                    <span className={`text-sm ${!calculatorState.showAdvancedMode ? "font-bold text-gray-900" : "text-gray-500"}`}>
                        Simple
                    </span>

                    <button
                        type="button"
                        onClick={() => {
                            setCalculatorState(prev => ({
                                ...prev,
                                showAdvancedMode: !prev.showAdvancedMode,
                        }));}}
                        className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${
                            calculatorState.showAdvancedMode ? "bg-orange-500" : "bg-gray-400"
                        }`}
                        aria-label="Toggle calculator mode"
                        aria-pressed={calculatorState.showAdvancedMode}
                    >
                        <span
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                                calculatorState.showAdvancedMode ? "translate-x-8" : "translate-x-0"
                            }`}
                        />
                    </button>

                    <span className={`text-sm ${calculatorState.showAdvancedMode ? "font-bold text-gray-900" : "text-gray-500"}`}>
                        Advanced
                    </span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-sm">

                <div className="grid grid-cols-5 sm:flex sm:flex-row gap-2">
                    {Array.from(warDaysActions.keys()).map((index) => {
                        const dayNumber = index + 1;

                        return (
                            <button
                                type="button"
                                key={index}
                                className={`
                                    flex justify-center items-center
                                    text-white font-bold
                                    py-2 px-2 sm:px-4
                                    transition duration-200
                                    rounded ring-1 ring-black border-b-4
                                    text-xs hover:cursor-pointer
                                    ${calculatorState.selectedDay === dayNumber
                                        ? "bg-orange-400 border-orange-500 hover:bg-orange-300"
                                        : "bg-gray-400 border-gray-500 hover:bg-gray-300"
                                    }
                                `}
                                onClick={() => handleDayChange(dayNumber)}
                            >
                                Day {dayNumber}
                            </button>
                        );
                    })}
                </div>

                <div>

                    <div className="
                        flex items-center justify-between gap-2
                        border-2 rounded px-3 py-2 sm:py-0
                        bg-green-50 border-green-600
                        min-w-0
                    ">
                        <span className="font-bold text-sm">
                            DAY {calculatorState.selectedDay} TOTAL
                        </span>
                        <span className="font-black text-xl sm:text-2xl tabular-nums">
                            {formatPoints(totalPoints)}
                        </span>
                    </div>

                    <div className="
                        flex items-center justify-between gap-2
                        border-2 rounded px-3 py-2
                        bg-orange-50 border-orange-400
                        min-w-0 fixed bottom-4 left-1/2 -translate-x-1/2 z-50

                        w-[calc(100%-2rem)] max-w-md
                        rounded-xl border border-gray-300 shadow-xl backdrop-blur-md
                        p-3 sm:p-4
                    ">
                        <span className="font-bold text-sm">
                            TOTAL WAR POINTS
                        </span>
                        <span className="font-black text-xl sm:text-2xl tabular-nums">
                            {formatPoints(totalWarPoints)}
                        </span>
                    </div>

                </div>
            </div>
            <div className="border-2 rounded-md p-3 flex flex-col gap-4 shadow-lg/20">
                {
                    filteredActions.map(group => {
                        const customAct = group.customAction;
                        const actionList = group.actions || [];
                        const groupDefaultCost = (group as any).defaultCost ?? 1;
                        const summary = getGroupSummary(group);

                        return(
                            <div key={group.id} className="border-b pb-4 flex flex-col gap-3">
                                <div className="text-xl font-bold">
                                    {group.name}
                                </div>

                                {group.id === 1 && (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-wrap items-end gap-4">
                                            <NumberField
                                                label="Number of hammers:"
                                                value={getQty("forge-hammers")}
                                                onChange={(v) =>
                                                    handleQuantityChange("forge-hammers", v)
                                                }
                                            />
                                            {calculatorState.showAdvancedMode && 
                                            <>
                                                <NumberField
                                                label="Extra chance (%):"
                                                value={calculatorState.specialSettings.forgeExtraChance ?? 0}
                                                onChange={(v) =>
                                                    handleSettingChange("forgeExtraChance", v)
                                                }
                                            />

                                                <label className="flex flex-row gap-1 font-medium justify-between items-center font-medium w-full bg-gray-50 p-1 border-1 border-gray-200">
                                                    Forge level:
                                                    <select
                                                        value={calculatorState.selectedForgeLevel}
                                                        onChange={(e) => {
                                                            setCalculatorState(prev => ({
                                                                ...prev,
                                                                selectedForgeLevel: Number(e.target.value),
                                                            }));
                                                        }
                                                        }
                                                        className="border rounded-sm px-2 py-1 bg-white"
                                                    >
                                                        {forgeLevels.map((level) => (
                                                            <option key={level.level} value={level.level}>
                                                                Level {level.level}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </>
                                            }
                                            
                                        </div>

                                        <div className="border rounded p-3 flex flex-col gap-3">
                                            <div className="font-semibold text-lg">
                                                Points per equipment tier
                                            </div>

                                            {FORGE_TIERS.map((tier) => (
                                                <div
                                                    key={tier.key}
                                                    className="flex flex-wrap items-center justify-between gap-3"
                                                >
                                                    <span className="text-xs sm:text-sm">{tier.title}</span>

                                                    <NumberField
                                                        label="Points:"
                                                        value={getPoints(tier.key, tier.defaultPoints)}
                                                        onChange={(v) => handlePointsChange(tier.key, v)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {/* {calculatorState.showAdvancedMode && 
                                            <div className="border rounded p-3 flex flex-col gap-2">
                                                <div className="font-semibold">
                                                    Equipment drop chances - Level {selectedForge.level}
                                                </div>

                                                {group.actions.map((act) => {
                                                    const chanceKey =
                                                        FORGE_CHANCE_KEYS[
                                                            act.name as keyof typeof FORGE_CHANCE_KEYS
                                                        ];

                                                    const chance = chanceKey
                                                        ? selectedForge.forgeChances[chanceKey]
                                                        : 0;

                                                    const tier = FORGE_TIERS.find(item =>
                                                        item.names.includes(act.name)
                                                    );

                                                    const points = tier
                                                        ? getPoints(tier.key, tier.defaultPoints)
                                                        : act.defaultPoints;

                                                    const expectedPoints = chance * points;

                                                    return (
                                                        <div
                                                            key={act.name}
                                                            className="flex flex-wrap items-center justify-between gap-3 border-b last:border-b-0 pb-2 last:pb-0"
                                                        >
                                                            <span className="font-medium">
                                                                {act.name}
                                                            </span>

                                                            <div className="flex flex-row justify-between sm:grid sm:grid-cols-[1fr_1fr_auto] items-center gap-3 text-sm w-full">
                                                                <div className="text-zinc-600">
                                                                    Chance: {(chance * 100).toLocaleString(
                                                                        undefined,
                                                                        { maximumFractionDigits: 4 }
                                                                    )}%
                                                                </div>

                                                                <div className="text-zinc-600">
                                                                    {formatPoints(points)} pts
                                                                </div>

                                                                <div className="font-semibold">
                                                                    Expected: {formatPoints(expectedPoints)} pts
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        } */}
                                    </div>
                                )}
                                {group.id === 2 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="Dungeon Keys:"
                                            value={getQty("dungeon-keys", 8)}
                                            onChange={(v) => handleQuantityChange("dungeon-keys", v)}
                                        />
                                        <NumberField
                                            label="Points:"
                                            value={getPoints("dungeon-pts", customAct.defaultPoints)}
                                            onChange={(v) => handlePointsChange("dungeon-pts", v)}
                                        />
                                    </div>
                                )}

                                {group.id === 3 && (
                                    <div className="flex flex-col gap-2">
                                        {actionList.map((act, idx) => {
                                            const qtyKey = `egg-qty-${act.name}`;
                                            const pointKey = `egg-pts-${act.name}`;

                                            return (
                                                <div
                                                    key={idx}
                                                    className="
                                                        flex flex-wrap items-end gap-3
                                                        border-b last:border-b-0 pb-3 last:pb-0
                                                    "
                                                >
                                                    <span className="w-full sm:w-36 font-semibold">
                                                        {act.name}
                                                    </span>

                                                    <label className="flex flex-col gap-1">
                                                        Hatch:
                                                        <input
                                                            type="number"
                                                            value={getQty(qtyKey)}
                                                            onChange={(e) => handleQuantityChange(
                                                                qtyKey,
                                                                Math.max(0, Math.floor(Number(e.target.value) || 0))
                                                            )}
                                                            className="border px-2 w-24 rounded-sm"
                                                            min={0}
                                                            step={1}
                                                        />
                                                    </label>

                                                    <label className="flex flex-col gap-1">
                                                        Points:
                                                        <input
                                                            type="number"
                                                            value={getPoints(pointKey, act.defaultPoints)}
                                                            onChange={(e) => handlePointsChange(
                                                                pointKey,
                                                                Math.max(0, Math.floor(Number(e.target.value) || 0))
                                                            )}
                                                            className="border px-2 w-24 rounded-sm"
                                                            min={0}
                                                            step={1}
                                                        />
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {group.id === 4 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="Pets to merge:"
                                            value={getQty("merge-pets-qty")}
                                            onChange={(v) => handleQuantityChange("merge-pets-qty", v)}
                                        />
                                        <NumberField
                                            label="Points:"
                                            value={getPoints("merge-pets-pts", customAct.defaultPoints)}
                                            onChange={(v) => handlePointsChange("merge-pets-pts", v)}
                                        />
                                    </div>
                                )}

                                {group.id === 5 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="Mount keys:"
                                            value={getQty("mount-keys-qty")}
                                            onChange={(v) => handleQuantityChange("mount-keys-qty", v)}
                                        />
                                        {
                                            calculatorState.showAdvancedMode && <>
                                            <NumberField
                                                label="Cost:"
                                                value={getCost("mountCost", groupDefaultCost)}
                                                onChange={(v) => handleSettingChange("mountCost", v)}
                                            />
                                            <NumberField
                                                label="Extra chance (%):"
                                                value={calculatorState.specialSettings.mountExtraChance ?? 0}
                                                onChange={(v) => handleSettingChange("mountExtraChance", v)}
                                            />
                                            
                                            </>
                                        }
                                        <NumberField
                                                label="Points:"
                                                value={getPoints("mount-pts", customAct.defaultPoints)}
                                                onChange={(v) => handlePointsChange("mount-pts", v)}
                                            />
                                    </div>
                                )}

                                {group.id === 6 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="Mount merges:"
                                            value={getQty("merge-mounts-qty", Math.floor(getExpectedMounts()))}
                                            onChange={(v) => handleQuantityChange("merge-mounts-qty", v)}
                                        />
                                        <NumberField
                                            label="Points:"
                                            value={getPoints("merge-mounts-pts", customAct.defaultPoints)}
                                            onChange={(v) => handlePointsChange("merge-mounts-pts", v)}
                                        />
                                    </div>
                                )}

                                {group.id === 7 && (
                                    <div className="flex flex-col gap-2">
                                        {actionList.map((act, idx) => {
                                            const qtyKey = `tech-qty-${act.name}`;
                                            const pointKey = `tech-pts-${act.name}`;

                                            return (
                                                <div key={idx} className="flex flex-wrap items-end gap-3
                                                    border-b last:border-b-0 pb-3 last:pb-0">
                                                    <span className="w-full sm:w-36 font-semibold">{act.name}</span>
                                                    <label className="flex flex-row justify-between sm:justify-center items-center gap-1 min-w-full sm:min-w-0">How many:
                                                        <input
                                                            type="number"
                                                            value={getQty(qtyKey)}
                                                            onChange={(e) => handleQuantityChange(
                                                                qtyKey,
                                                                Math.max(0, Math.floor(Number(e.target.value) || 0))
                                                            )}
                                                            className={`ml-1 ${inputClass}`}
                                                            min={0}
                                                            step={1}
                                                        />
                                                    </label>
                                                    <label className="flex flex-row justify-between sm:justify-center items-center gap-1 min-w-full sm:min-w-0">Points:
                                                        <input
                                                            type="number"
                                                            value={getPoints(pointKey, act.defaultPoints)}
                                                            onChange={(e) =>
                                                                handlePointsChange(
                                                                    pointKey,
                                                                    Math.max(0, Math.floor(Number(e.target.value) || 0))
                                                                )
                                                            }
                                                            className={`ml-1 ${inputClass}`}
                                                            min={0}
                                                            step={1}
                                                        />
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {group.id === 8 && (
                                    <div className="flex flex-col gap-2">
                                        {actionList.map((act, idx) => {
                                            const qtyKey = `spend-qty-${act.name}`;
                                            const pointKey = `spend-pts-${act.name}`;

                                            return (
                                                <div key={idx} className="flex flex-wrap items-end gap-3
                                                    border-b last:border-b-0 pb-3 last:pb-0">
                                                    <span className="w-full font-semibold">{act.name}</span>
                                                    <label className="flex flex-col gap-1">
                                                        Owned amount:
                                                        <input
                                                            type="number"
                                                            value={getQty(qtyKey)}
                                                            onChange={(e) => handleQuantityChange(
                                                                qtyKey,
                                                                Math.max(0, Math.floor(Number(e.target.value) || 0))
                                                            )}
                                                            className="border px-2 w-24 rounded-sm"
                                                            min={0}
                                                            step={1}
                                                        />
                                                    </label>
                                                    <label className="flex flex-col gap-1">Points:
                                                        <input
                                                            type="number"
                                                            value={getPoints(pointKey, act.defaultPoints)}
                                                            onChange={(e) =>
                                                                handlePointsChange(
                                                                    pointKey,
                                                                    Math.max(0, Math.floor(Number(e.target.value) || 0))
                                                                )
                                                            }
                                                            className={`ml-1 ${inputClass}`}
                                                            min={0}
                                                            step={1}
                                                        />
                                                    </label>
                                                    <span className="text-xs text-zinc-500 w-full sm:w-auto">
                                                        = {formatPoints(Math.floor(getQty(qtyKey) / getSpendUnitSize(act.name)))} × {formatPoints(getPoints(pointKey, act.defaultPoints))} pts
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {group.id === 9 && customAct && (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <NumberField
                                                label="Summon Tickets:"
                                                value={getQty("skill-tickets-qty")}
                                                onChange={(v) => handleQuantityChange("skill-tickets-qty", v)}
                                            />
                                            {calculatorState.showAdvancedMode && <>
                                                <NumberField
                                                label="Cost:"
                                                value={getCost("skillCost", groupDefaultCost)}
                                                onChange={(v) => handleSettingChange("skillCost", v)}
                                            />
                                            
                                            </>}
                                            
                                            <NumberField
                                                label="Points:"
                                                value={getPoints("skill-summon-pts", customAct.defaultPoints)}
                                                onChange={(v) => handlePointsChange("skill-summon-pts", v)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {group.id === 10 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="Skills to upgrade:"
                                            value={getQty("skill-upgrade-qty")}
                                            onChange={(v) => handleQuantityChange("skill-upgrade-qty", v)}
                                        />
                                        <NumberField
                                            label="Points:"
                                            value={getPoints("skill-upgrade-pts", customAct.defaultPoints)}
                                            onChange={(v) => handlePointsChange("skill-upgrade-pts", v)}
                                        />
                                    </div>
                                )}

                                <SectionSummary points={summary.points} detail={summary.detail} />
                            </div>
                        )
                    })
                }
                <div className="flex flex-row items-center justify-between gap-3 border-2 rounded px-4 py-3 bg-green-50 border-green-600">
                    <div className="flex flex-col">
                        <span className="font-bold text-md">DAY {calculatorState.selectedDay} TOTAL</span>
                        <span className="text-xs text-zinc-500">Expected points from all sections above</span>
                    </div>
                    <span className="font-black text-3xl">{formatPoints(totalPoints)}</span>
                </div>
            </div>
        </section>
    );
}

export default WarDayCalculator;