import type { forgeLevelType, LevelWithChances } from "../../../types/types";

export function toNonNegativeInteger(value: number) {
    return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

export function formatDuration(seconds: number) {
    const total = Math.ceil(seconds);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
    return parts.join(" ");
}

export function getSummonCount(items: number, cost: number, extraChance = 0) {
    const actions = cost > 0 ? Math.floor(items / cost) : 0;
    const expectedSummons = Math.floor(actions * (1 + extraChance / 100));
    return { actions, expectedSummons };
}

export function getCumulativeChances(
    levels: LevelWithChances[],
    currentLevel: number,
    totalProgress: number,
    startProgress = 0
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

        if(!lvl) continue;

        if (lvl.level > currentLevel) break;

        const levelEnd = lvl.totalSummon ?? totalProgress;

        // const summonsHere =
        //     lvl.level === currentLevel
        //         ? totalProgress - previousTotal
        //         : (lvl.totalSummon ?? previousTotal) - previousTotal;

        const summonsHere = Math.max(
            0,
            Math.min(totalProgress, levelEnd),
            Math.max(startProgress, previousTotal)
        )

        rarities.forEach(r => {
            const p = lvl.chances[r] / 100;
            missChance[r] *= Math.pow(1 - p, summonsHere);
            expected[r] += summonsHere * p;
        });

        previousTotal = lvl.totalSummon ?? previousTotal;
    }

    const atLeastOne: Record<string, number> = {};
    rarities.forEach(r => (atLeastOne[r] = (1 - missChance[r]) * 100));

    return { atLeastOne, expected };
}

export function getMaxLevel(
    levels: LevelWithChances[], 
    totalProgress: number,
    startProgress = 0
) {
    let index = levels.findIndex(l => l.totalSummon === null || totalProgress < l.totalSummon);
    if (index === -1) index = levels.length - 1;

    const current = levels[index];
    const previousTotal = levels[index - 1]?.totalSummon ?? 0;

    return {
        level: current.level,
        progress: totalProgress - previousTotal,
        required: current.totalSummon === null ? null : current.totalSummon - previousTotal,
        chances: current.chances,
        cumulativeChances: getCumulativeChances(levels, current.level, totalProgress, startProgress),
    };
}

export function getForgeResult(
    levels: forgeLevelType[],
    coins: number,
    costDecreasePercent: number,
    speedUpPercent: number,
    startingLevel = 1,
    startingProgress = 0
) {
    const costDecrease = Math.min(100, costDecreasePercent);
    const speedUp = Math.min(100, speedUpPercent);

    let remainingCoins = coins;
    let level = startingLevel;
    let progress = toNonNegativeInteger(startingProgress);


    let totalTimeSeconds = 0;
    let totalGemCost = 0;

    for (let i = levels.findIndex(l => l.level === level) + 1;
         i < levels.length;
         i++) {

        const next = levels[i];
        if (next.totalCost === null) break;

        const cost = Math.ceil(
            next.totalCost * (1 - costDecrease / 100)
        );

        const needed = Math.max(0, cost - progress);

        if (remainingCoins < needed) break;

        remainingCoins -= needed;
        progress = 0;
        level = next.level;

        totalGemCost += next.gemCost ?? 0;
        totalTimeSeconds += (next.time ?? 0) * (1 - speedUp / 100);
    }

    const next = levels.find(l => l.level === level + 1);
    const required =
        next && next.totalCost !== null
            ? Math.ceil(next.totalCost * (1 - costDecrease / 100))
            : null;

    return {
        level,
        progress: required === null ? 0 : Math.min(remainingCoins, required),
        required,
        totalTimeSeconds,
        totalGemCost,
    };
}
export function getLevelProgressInfo(
    levels: LevelWithChances[],
    currentLevel: number
){
    const currentIndex = levels.findIndex(
        l=> l.level === currentLevel
    );

    if(currentIndex === -1) return null;

    const current = levels[currentIndex];
    const previousTotal = levels[currentIndex-1]?.totalSummon ?? 0;

    if(current.totalSummon === null){
        return{
            required: null,
            previousTotal
        }
    }
    return {
        required: current.totalSummon - previousTotal,
        previousTotal
    }
}

export function getTotalProgress(
    levels: LevelWithChances[],
    currentLevel: number,
    progress: number
){

    const info = getLevelProgressInfo(levels, currentLevel);

    if(!info) return 0;

    const safeProgress = info.required === null ? 0 : 
    Math.min(info.required, toNonNegativeInteger(progress))

    return info.previousTotal + safeProgress;
}

export function getForgeProgressInfo(
    levels: forgeLevelType[],
    currentLevel: number,
    costDecreasePercent: number
){
    const next = levels.find(l => l.level === currentLevel + 1);

    if (!next || next.totalCost === null) {
        return { required: null };
    }

    return {
        required: Math.ceil(
            next.totalCost *
            (1 - Math.min(100, costDecreasePercent) / 100)
        ),
    };  
}