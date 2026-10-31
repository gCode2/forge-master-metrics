import { formatPoints } from "../utils";

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
export default SectionSummary;