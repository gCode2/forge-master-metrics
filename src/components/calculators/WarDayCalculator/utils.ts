export function formatPoints(value: number) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}