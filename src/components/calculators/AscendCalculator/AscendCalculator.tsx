import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type {
    AscendCalculatorState,
    ResourceName,
    SummonResourceName,
} from "../../../types/types";
import { ascendResources } from "../../../data/ascend";
import { forgeLevels } from "../../../data/resourceData";
import NumberField from "../components/NumberField";
import {
    formatDuration,
    getForgeResult,
    getMaxLevel,
    getSummonCount,
    toNonNegativeInteger,
} from "./ascendCalculations";

const STORAGE_KEY = "ascend-calculator-v1";

function getDefaultCost(name: ResourceName) {
    return ascendResources.find(r => r.resource === name)?.defaultCost ?? 1;
}

const DEFAULT_STATE: AscendCalculatorState = {
    selectedResource: "Forge",
    resourceQuantities: {
        "qty-Forge": 0,
        "qty-Skills": 0,
        "qty-Pets": 0,
        "qty-Mounts": 0,
    },
    resourceCosts: {
        "cost-Skills": getDefaultCost("Skills"),
        "cost-Pets": getDefaultCost("Pets"),
        "cost-Mounts": getDefaultCost("Mounts"),
    },
    resourceBonuses: {
        "bonus-decrease-Forge": 0,
        "bonus-speed-Forge": 0,
        "bonus-chance-Pets": 0,
        "bonus-chance-Mounts": 0,
    },
};

const SUMMON_CONFIG: Record<
    SummonResourceName,
    { itemLabel: string; hasExtraChance: boolean; summonsPerAction: number }
> = {
    Skills: { itemLabel: "Tickets:", hasExtraChance: false, summonsPerAction: 5 },
    Pets: { itemLabel: "Eggs:", hasExtraChance: true, summonsPerAction: 1 },
    Mounts: { itemLabel: "Clockwiders:", hasExtraChance: true, summonsPerAction: 1 },
};

const ICON_POSITIONS: Record<ResourceName, string> = {
    Forge: "-23px 1px",
    Skills: "-162px 1px",
    Pets: "-23px -92px",
    Mounts: "-93px -69px",
};

function mergeNumbers(defaults: Record<string, number>, saved: unknown) {
    const result = { ...defaults };
    if (saved && typeof saved === "object") {
        for (const [key, value] of Object.entries(saved)) {
            if (typeof value === "number") result[key] = toNonNegativeInteger(value);
        }
    }
    return result;
}

function loadState(): AscendCalculatorState {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return DEFAULT_STATE;

        const parsed = JSON.parse(saved);
        const isValidResource = ascendResources.some(r => r.resource === parsed?.selectedResource);

        return {
            selectedResource: isValidResource ? parsed.selectedResource : DEFAULT_STATE.selectedResource,
            resourceQuantities: mergeNumbers(DEFAULT_STATE.resourceQuantities, parsed?.resourceQuantities),
            resourceCosts: mergeNumbers(DEFAULT_STATE.resourceCosts, parsed?.resourceCosts),
            resourceBonuses: mergeNumbers(DEFAULT_STATE.resourceBonuses, parsed?.resourceBonuses),
        };
    } catch {
        return DEFAULT_STATE;
    }
}

function InfoBox({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-3 border-1 p-3 rounded-md bg-gray-100 border-gray-500">
            {children}
        </div>
    );
}

function RarityGrid({ values, suffix = "" }: { values: Record<string, number>; suffix?: string }) {
    return (
        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:flex-nowrap sm:justify-center">
            {Object.entries(values).map(([key, value]) => (
                <div
                    key={key}
                    className={`${key} rounded-md p-2 border-b-4 ring-1 text-xs
                    grid grid-cols-[1fr_auto] items-center gap-2
                    w-full sm:w-auto sm:flex-none`}
                >
                    <span className="text-left whitespace-nowrap">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <span className="font-bold text-right whitespace-nowrap">
                        {value.toFixed(2)}
                        {suffix}
                    </span>
                </div>
            ))}
        </div>
    );
}

function LevelHeader({
    level,
    progress,
    required,
}: {
    level: number;
    progress: number;
    required: number | null;
}) {
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="text-xl">
                You'll reach
                <span className="font-bold"> level {level}</span>
            </div>
            <div className="text-gray-800 text-xs">
                {required === null
                    ? "(MAX level)"
                    : `(${progress}/${required} to level ${level + 1})`}
            </div>
        </div>
    );
}

function AscendCalculator() {
    const [calculatorState, setCalculatorState] = useState<AscendCalculatorState>(loadState);
    const [isConfirmingReset, setConfirmingReset] = useState(false);

    const { selectedResource, resourceQuantities, resourceCosts, resourceBonuses } = calculatorState;

    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(calculatorState));
            } catch {
                
            }
        }, 200);
        return () => clearTimeout(timeout);
    }, [calculatorState]);

    useEffect(() => {
        if (!isConfirmingReset) return;
        const timer = setTimeout(() => setConfirmingReset(false), 3000);
        return () => clearTimeout(timer);
    }, [isConfirmingReset]);

    function updateNumber(
        group: "resourceQuantities" | "resourceCosts" | "resourceBonuses",
        key: string,
        value: number,
        max?: number
    ) {
        const clean = toNonNegativeInteger(value);
        setCalculatorState(prev => ({
            ...prev,
            [group]: { ...prev[group], [key]: max !== undefined ? Math.min(max, clean) : clean },
        }));
    }

    function handleReset() {
        if (isConfirmingReset) {
            setCalculatorState(DEFAULT_STATE);
            setConfirmingReset(false);
        } else {
            setConfirmingReset(true);
        }
    }

    const qty = resourceQuantities[`qty-${selectedResource}`] ?? 0;
    const cost = resourceCosts[`cost-${selectedResource}`] ?? getDefaultCost(selectedResource);
    const extraChance = resourceBonuses[`bonus-chance-${selectedResource}`] ?? 0;
    const forgeDecrease = resourceBonuses["bonus-decrease-Forge"] ?? 0;
    const forgeSpeed = resourceBonuses["bonus-speed-Forge"] ?? 0;

    const forgeResult = useMemo(
        () =>
            selectedResource === "Forge"
                ? getForgeResult(forgeLevels, qty, forgeDecrease, forgeSpeed)
                : null,
        [selectedResource, qty, forgeDecrease, forgeSpeed]
    );

    const summonResult = useMemo(() => {
        if (selectedResource === "Forge") return null;

        const config = SUMMON_CONFIG[selectedResource];
        const levels = ascendResources.find(r => r.resource === selectedResource)!.levels;
        const { actions, expectedSummons } = getSummonCount(
            qty,
            cost,
            config.hasExtraChance ? extraChance : 0
        );
        const summons = expectedSummons * config.summonsPerAction;

        return { actions, summons, ascend: getMaxLevel(levels, summons) };
    }, [selectedResource, qty, cost, extraChance]);

    function renderForge() {
        if (!forgeResult) return null;
        return (
            <div className="flex flex-col gap-3">
                <div className="text-xl font-bold">Forge</div>
                <div className="flex flex-col gap-3">
                    <NumberField
                        label="Coins:"
                        value={qty}
                        onChange={v => updateNumber("resourceQuantities", "qty-Forge", v)}
                    />
                    <NumberField
                        label="Forge speed up (%):"
                        value={forgeSpeed}
                        onChange={v => updateNumber("resourceBonuses", "bonus-speed-Forge", v, 100)}
                    />
                    <NumberField
                        label="Forge cost decrease (%):"
                        value={forgeDecrease}
                        onChange={v => updateNumber("resourceBonuses", "bonus-decrease-Forge", v, 100)}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="font-bold text-xl">Summary</div>
                    <InfoBox>
                        <LevelHeader
                            level={forgeResult.level}
                            progress={forgeResult.progress}
                            required={forgeResult.required}
                        />
                    </InfoBox>
                    <InfoBox>
                        <div className="flex w-full justify-center text-base">
                            Estimated time:&nbsp;
                            <span className="font-bold">{formatDuration(forgeResult.totalTimeSeconds)}</span>
                        </div>
                    </InfoBox>
                    <InfoBox>
                        <div className="flex w-full justify-center text-base">
                            Gems to reach that level:&nbsp;
                            <span className="font-bold">{forgeResult.totalGemCost}</span>
                        </div>
                    </InfoBox>
                </div>
            </div>
        );
    }

    function renderSummonPanel(resource: SummonResourceName) {
        if (!summonResult) return null;
        const config = SUMMON_CONFIG[resource];
        const { ascend, actions, summons } = summonResult;

        return (
            <div className="flex flex-col gap-3">
                <div className="text-xl font-bold">{resource}</div>
                <div className="flex flex-col gap-3">
                    <NumberField
                        label={config.itemLabel}
                        value={qty}
                        onChange={v => updateNumber("resourceQuantities", `qty-${resource}`, v)}
                    />
                    <NumberField
                        label="Summon cost:"
                        value={cost}
                        onChange={v => updateNumber("resourceCosts", `cost-${resource}`, v)}
                    />
                    {config.hasExtraChance && (
                        <NumberField
                            label="Extra chance (%):"
                            value={extraChance}
                            onChange={v => updateNumber("resourceBonuses", `bonus-chance-${resource}`, v)}
                        />
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <div className="font-bold text-xl">Summary</div>

                    <InfoBox>
                        <LevelHeader
                            level={ascend.level}
                            progress={ascend.progress}
                            required={ascend.required}
                        />
                        <RarityGrid values={ascend.chances} suffix="%" />
                    </InfoBox>

                    <InfoBox>
                        <div className="flex flex-col w-full justify-center items-center">
                            <div className="text-xl font-bold">Cumulative chances</div>
                            <div className="text-xs text-center">
                                Odds of getting certain drop rarities in the Ascension process
                            </div>
                        </div>
                        <RarityGrid values={ascend.cumulativeChances.atLeastOne} suffix="%" />
                    </InfoBox>

                    <InfoBox>
                        <div className="flex flex-col w-full justify-center items-center">
                            <div className="text-xl font-bold">Expected average drops</div>
                            <div className="text-xs">
                                Per {summons} summons ({actions} actions)
                            </div>
                        </div>
                        <RarityGrid values={ascend.cumulativeChances.expected} />
                    </InfoBox>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-2 sm:gap-5">
                <div className="h-16 w-16 sm:h-25 sm:w-25 shrink-0">
                    <img src="/icons/ascend.png" className="h-16 w-16 sm:h-25 sm:w-25 shrink-0"/>
                </div>
                <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start">
                    <div className="font-bold">
                        Ascend Calculator
                    </div>
                    <div className="text-sm text-zinc-500 text-center sm:text-left">
                        Find out how much you need to upgrade and what resources are required for your next ascension.
                    </div>
                </div>
                <div className="flex sm:ml-auto pt-2">
                    <button
                        type="button"
                        className={`
                        flex justify-center items-center
                        text-white font-bold
                        py-2 px-2 sm:px-4
                        transition duration-300
                        rounded ring-1 ring-black border-b-4 w-26 sm:w-31
                        text-xs min-w-max hover:cursor-pointer ${isConfirmingReset ? "bg-red-500 border-red-600 hover:border-red-500 hover:bg-red-400" : "bg-red-400 border-red-500 hover:border-red-400 hover:bg-red-300"}`}
                        onClick={handleReset}>
                            {isConfirmingReset ? "Are you sure? " : "Reset calculator"}
                    </button>
                </div>
            </div>
            <div className="mt-3 w-full">
                <section className="flex flex-col gap-4 sm:gap-5 text-sm min-w-0 w-full">
                    <div className="border-2 rounded-md p-3 flex flex-col gap-4 shadow-lg/20">
                        <div className="text-xl font-bold text-center sm:text-left">Select Ascension</div>

                        <div className="grid grid-cols-4 sm:flex sm:flex-row gap-2 items-center justify-center">
                            {ascendResources.map(resource => (
                                <button
                                    type="button"
                                    key={resource.id}
                                    className={`
                                    flex flex-row justify-around items-center
                                    text-white font-medium py-1 px-1 sm:px-2
                                    transition duration-200 sm:w-21
                                    rounded ring-1 ring-black border-b-4
                                    text-[10px] hover:cursor-pointer
                                    ${
                                        selectedResource === resource.resource
                                            ? "bg-orange-400 border-orange-500 hover:bg-orange-300 hover:border-orange-400"
                                            : "bg-gray-400 border-gray-500 hover:bg-gray-300 hover:border-gray-400"
                                    }`}
                                    onClick={() =>
                                        setCalculatorState(prev => ({
                                            ...prev,
                                            selectedResource: resource.resource,
                                        }))
                                    }
                                >
                                    <div className="flex flex-row items-center justify-center gap-1 w-full h-6">
                                        <div
                                            className="w-6 h-6 shrink-0"
                                            style={{
                                                backgroundImage: "url('/icons/ICONS.png')",
                                                backgroundSize: "186px 186px",
                                                backgroundPosition: ICON_POSITIONS[resource.resource],
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
                            {selectedResource === "Forge" ? renderForge() : renderSummonPanel(selectedResource)}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AscendCalculator;