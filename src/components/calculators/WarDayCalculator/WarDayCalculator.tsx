import { useState } from "react";
import { forgeLevels, warActions, warDaysActions } from "../../../data/warDay";

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

const inputClass = "border px-1 w-25 rounded-sm";

function formatPoints(value: number) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function getSpendUnitSize(actionName: string) {
    const match = actionName.match(/Spend (\d+)/);
    return match ? Number(match[1]) : 1;
}

function NumberField({ label, value, onChange, width = "w-25" }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    width?: string;
}) {
    return (
        <label>
            {label}
            <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
                className={`border ml-2 px-2 ${width} rounded-sm`}
            />
        </label>
    );
}

function SectionSummary({ points, detail }: { points: number; detail?: string }) {
    return (
        <div className="flex flex-row items-center justify-between gap-3 border-2 rounded px-4 py-2 bg-gray-100">
            <div className="flex flex-col">
                <span className="text-sm font-bold">SECTION SUMMARY</span>
                {detail && <span className="text-xs text-zinc-500">{detail}</span>}
            </div>
            <span className="text-sm bg-orange-400 rounded-lg py-0.5 px-2 font-bold">
                {formatPoints(points)} pts
            </span>
        </div>
    );
}

function WarDayCalculator() {
    const [selectedDay, setSelectedDay] = useState(1);

    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [customPoints, setCustomPoints] = useState<Record<string, number>>({});
    const [specialSettings, setSpecialSettings] = useState<Record<string, number>>({
        mountExtraChance: 0,
        forgeExtraChance: 0,
    });

    const [selectedForgeLevel, setSelectedForgeLevel] = useState(1);

    const [showAdvancedMode, setShowAdvancedMode] = useState(true);

    const daysIds = warDaysActions[selectedDay - 1] || [];

    const selectedForge = forgeLevels.find(level => level.level === selectedForgeLevel) ?? forgeLevels[0];

    const filteredActions = daysIds
    .map(id => warActions.find(actionGroup => actionGroup.id === id))
    .filter((group): group is WarGroup => group !== undefined);

    function handleDayChange(dayNumber: number){
        setSelectedDay(dayNumber);
    }

    function dayKey(key: string, day = selectedDay) {
        return `day${day}:${key}`;
    }

    function getQty(key: string, defaultVal: number = 0, day = selectedDay) {
        return quantities[dayKey(key, day)] ?? defaultVal;
    }

    function toNonNegativeInteger(value: number) {
        return Number.isFinite(value)
            ? Math.max(0, Math.floor(value))
            : 0;
    }

    function handleQuantityChange(key: string, value: number) {
        const fullKey = dayKey(key);

        setQuantities(prev => ({
            ...prev,
            [fullKey]: toNonNegativeInteger(value),
        }));
    }

    function handlePointsChange(key: string, value: number) {
        setCustomPoints(prev => ({
            ...prev,
            [key]: toNonNegativeInteger(value),
        }));
    }

    function getPoints(key: string, defaultValue: number){
        return customPoints[key] !== undefined ? customPoints[key] : defaultValue;
    }

    function handleSettingChange(key: string, value: number) {
        setSpecialSettings(prev => ({
            ...prev,
            [key]: toNonNegativeInteger(value),
        }));
    }

    function getCost(key: string, defaultVal: number = 1){
        return specialSettings[key] !== undefined ? specialSettings[key] : defaultVal;
    }

    function getExpectedMounts(day = selectedDay) {
        const mountGroup = warActions.find(g => g.id === 5);
        const defaultCost = (mountGroup as any)?.defaultCost ?? 1;
        const keys = getQty("mount-keys-qty", 0, day);
        const cost = getCost("mountCost", defaultCost);
        const chance = specialSettings.mountExtraChance ?? 0;
        const summons = cost > 0 ? Math.floor(keys / cost) : 0;
        return Math.floor(summons * (1 + chance / 100));
    }

    function getGroupSummary(group: WarGroup, day = selectedDay): { points: number; detail?: string } {
        const customAct = group.customAction;
        const actionList = group.actions || [];
        const groupDefaultCost = (group as any).defaultCost ?? 1;

        switch (group.id) {
            case 1: {
                const hammers = getQty("forge-hammers",0,day);
                const extraChance = specialSettings.forgeExtraChance ?? 0;

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
                const chance = specialSettings.mountExtraChance ?? 0;
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
        <section className="flex flex-col gap-5 text-sm">
            <div className="flex items-center justify-between border-2 rounded-lg p-3 bg-gray-50">
                <div className="font-bold text-xl flex flex-col">
                    <div>
                        Calculator mode
                    </div>
                    
                    <div className="text-zinc-500 text-sm font-normal">
                        {showAdvancedMode ? "Seems too complicated? Switch to Simple Mode" : "To specify more details (i.e. extra drop chances or forge level) enable the Advanced Mode"}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`text-sm ${!showAdvancedMode ? "font-bold text-gray-900" : "text-gray-500"}`}>
                        Simple
                    </span>

                    <button
                        type="button"
                        onClick={() => setShowAdvancedMode(prev => !prev)}
                        className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${
                            showAdvancedMode ? "bg-orange-500" : "bg-gray-400"
                        }`}
                        aria-label="Toggle calculator mode"
                        aria-pressed={showAdvancedMode}
                    >
                        <span
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                                showAdvancedMode ? "translate-x-8" : "translate-x-0"
                            }`}
                        />
                    </button>

                    <span className={`text-sm ${showAdvancedMode ? "font-bold text-gray-900" : "text-gray-500"}`}>
                        Advanced
                    </span>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-3 text-sm">
                <div className="flex flex-row gap-3 text-sm">
                    {
                    Array.from(warDaysActions.keys()).map((index)=>{
                        const dayNumber = index + 1;
                        return (
                            <button type="button" key={index}
                                className={`${selectedDay === dayNumber ? `bg-orange-400 border-orange-500 hover:bg-orange-300 hover:border-orange-500` : `bg-gray-400 border-gray-500`} flex flex-row justify-center items-center text-white font-bold py-2 px-4 transition duration-200 text-sm enabled:hover:cursor-pointer rounded ring-1 ring-black border-b-4 hover:bg-gray-300 hover:border-gray-400`} onClick={()=>handleDayChange(dayNumber)}
                            >
                                Day {dayNumber}
                            </button>
                        )
                    })
                    }
                </div>
                <div className="flex flex-row gap-3">
                    <div className="flex flex-row items-center justify-between gap-3 border-2 rounded px-4 bg-green-50 border-green-600">
                        <div className="flex flex-row justify-center items-center">
                            <div className="font-bold text-md">DAY {selectedDay} TOTAL</div>
                        </div>
                        <div className="font-black text-2xl">{formatPoints(totalPoints)}</div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-3 border-2 rounded px-4 bg-orange-50 border-orange-400">
                        <div className="flex flex-row justify-center items-center">
                            <div className="font-bold text-md">TOTAL WAR POINTS</div>
                        </div>
                        <div className="font-black text-2xl">{formatPoints(totalWarPoints)}</div>
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
                                            {showAdvancedMode && 
                                            <>
                                                <NumberField
                                                label="Extra forge chance (%):"
                                                value={specialSettings.forgeExtraChance ?? 0}
                                                onChange={(v) =>
                                                    handleSettingChange("forgeExtraChance", v)
                                                }
                                            />

                                                <label className="flex flex-col gap-1 font-medium">
                                                    Forge level:
                                                    <select
                                                        value={selectedForgeLevel}
                                                        onChange={(e) =>
                                                            setSelectedForgeLevel(Number(e.target.value))
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
                                            <div className="font-semibold">
                                                Points per equipment tier
                                            </div>

                                            {FORGE_TIERS.map((tier) => (
                                                <div
                                                    key={tier.key}
                                                    className="flex flex-wrap items-center justify-between gap-3"
                                                >
                                                    <span>{tier.title}</span>

                                                    <NumberField
                                                        label="Points:"
                                                        value={getPoints(tier.key, tier.defaultPoints)}
                                                        onChange={(v) => handlePointsChange(tier.key, v)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {showAdvancedMode && 
                                            <div className="border rounded p-3 flex flex-col gap-2">
                                                <div className="font-semibold">
                                                    Equipment drop chances — Level {selectedForge.level}
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

                                                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                                                <span className="text-zinc-600">
                                                                    Chance: {(chance * 100).toLocaleString(
                                                                        undefined,
                                                                        { maximumFractionDigits: 4 }
                                                                    )}%
                                                                </span>

                                                                <span className="text-zinc-600">
                                                                    {formatPoints(points)} pts
                                                                </span>

                                                                <span className="font-semibold">
                                                                    Expected: {formatPoints(expectedPoints)} pts
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        }
                                        
                                    </div>
                                )}
                                {group.id === 2 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="How many dungeon keys do you have?:"
                                            value={getQty("dungeon-keys", 8)}
                                            onChange={(v) => handleQuantityChange("dungeon-keys", v)}
                                        />
                                        <NumberField
                                            label="Points per 1 dungeon:"
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
                                                <div key={idx} className="flex items-center gap-4">
                                                    <span className="w-36">{act.name}</span>
                                                    <label>How many you'll hatch?
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
                                                    <label>Pts:
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

                                {group.id === 4 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="How many pets can you merge?"
                                            value={getQty("merge-pets-qty")}
                                            onChange={(v) => handleQuantityChange("merge-pets-qty", v)}
                                        />
                                        <NumberField
                                            label="Pts per action:"
                                            value={getPoints("merge-pets-pts", customAct.defaultPoints)}
                                            onChange={(v) => handlePointsChange("merge-pets-pts", v)}
                                        />
                                    </div>
                                )}

                                {group.id === 5 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="How many mount keys do you have?:"
                                            value={getQty("mount-keys-qty")}
                                            onChange={(v) => handleQuantityChange("mount-keys-qty", v)}
                                        />
                                        {
                                            showAdvancedMode && <>
                                            <NumberField
                                                label="Cost per summon:"
                                                value={getCost("mountCost", groupDefaultCost)}
                                                onChange={(v) => handleSettingChange("mountCost", v)}
                                            />
                                            <NumberField
                                                label="Extra mount chance (%):"
                                                value={specialSettings.mountExtraChance ?? 0}
                                                onChange={(v) => handleSettingChange("mountExtraChance", v)}
                                            />
                                            
                                            </>
                                        }
                                        <NumberField
                                                label="Pts per action:"
                                                value={getPoints("mount-pts", customAct.defaultPoints)}
                                                onChange={(v) => handlePointsChange("mount-pts", v)}
                                            />
                                    </div>
                                )}

                                {group.id === 6 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="How many mounts to merge?"
                                            value={getQty("merge-mounts-qty", Math.floor(getExpectedMounts()))}
                                            onChange={(v) => handleQuantityChange("merge-mounts-qty", v)}
                                        />
                                        <NumberField
                                            label="Pts per action:"
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
                                                <div key={idx} className="flex items-center gap-4">
                                                    <span className="w-32">{act.name}</span>
                                                    <label>How many times:
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
                                                    <label>Pts:
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
                                                <div key={idx} className="flex items-center gap-4">
                                                    <span className="w-64">{act.name}</span>
                                                    <label>Owned amount:
                                                        <input
                                                            type="number"
                                                            value={getQty(qtyKey)}
                                                            onChange={(e) => handleQuantityChange(
                                                                qtyKey,
                                                                Math.max(0, Math.floor(Number(e.target.value) || 0))
                                                            )}
                                                            className="border ml-1 px-1 w-24 rounded-sm"
                                                            min={0}
                                                            step={1}
                                                        />
                                                    </label>
                                                    <label>Pts per unit:
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
                                                    <span className="text-xs text-zinc-500">
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
                                                label="How many summon tickets do you have?:"
                                                value={getQty("skill-tickets-qty")}
                                                onChange={(v) => handleQuantityChange("skill-tickets-qty", v)}
                                            />
                                            {showAdvancedMode && <>
                                                <NumberField
                                                label="Cost per summon:"
                                                value={getCost("skillCost", groupDefaultCost)}
                                                onChange={(v) => handleSettingChange("skillCost", v)}
                                            />
                                            
                                            </>}
                                            
                                            <NumberField
                                                label="Pts per skill:"
                                                value={getPoints("skill-summon-pts", customAct.defaultPoints)}
                                                onChange={(v) => handlePointsChange("skill-summon-pts", v)}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">Note: 1 summon gives 5 skills - the calculation multiplies this automatically.</span>
                                    </div>
                                )}

                                {group.id === 10 && customAct && (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <NumberField
                                            label="How many times can you upgrade?:"
                                            value={getQty("skill-upgrade-qty")}
                                            onChange={(v) => handleQuantityChange("skill-upgrade-qty", v)}
                                        />
                                        <NumberField
                                            label="Pts per action:"
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

                {/* TOTAL */}
                <div className="flex flex-row items-center justify-between gap-3 border-2 rounded px-4 py-3 bg-green-50 border-green-600">
                    <div className="flex flex-col">
                        <span className="font-bold text-md">DAY {selectedDay} TOTAL</span>
                        <span className="text-xs text-zinc-500">Expected points from all sections above</span>
                    </div>
                    <span className="font-black text-3xl">{formatPoints(totalPoints)}</span>
                </div>
            </div>
        </section>
    );
}

export default WarDayCalculator;