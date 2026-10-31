import { formatPoints } from "../utils";

function SectionSummary({ points, detail }: { points: number; detail?: string }) {
    return (
        <div className="
            flex flex-col sm:flex-row
            items-start sm:items-center
            justify-between gap-2
            border-2 rounded px-3 sm:px-4 py-2
            bg-gray-100
        ">
            <div className="flex flex-col min-w-0 sm:min-w-100">
                <span className="text-sm font-bold">
                    SECTION SUMMARY
                </span>

                {detail && (
                    <span className="text-xs text-zinc-500 break-words">
                        {detail}
                    </span>
                )}
            </div>
            <div className="w-full flex flex-row justify-center sm:justify-end items-center">
                <div className="text-sm bg-orange-400 border-2 border-orange-500 rounded-lg
                py-1 px-2 font-bold whitespace-nowrap
                self-end sm:self-auto">
            
                {formatPoints(points)} pts
            </div>
            </div>
            
        </div>
    );
}

export default SectionSummary;