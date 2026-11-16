import WarDayCalculator from "../components/calculators/WarDayCalculator/WarDayCalculator.tsx";
import AscendCalculator from "../components/calculators/AscendCalculator/AscendCalculator.tsx";

function CalculatorsPage () {

    return (
        <>
        <main className="flex flex-1 flex-col w-full py-4 px-3 sm:p-6 gap-2">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-3 items-center border-2 rounded w-full min-h-24 shadow-lg/20 px-3 sm:px-6 py-3">
                <img src="/icons/calculator.png" className="h-12 w-12 sm:h-16 sm:w-16 shrink-0" />

                <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-2xl sm:text-4xl font-black">
                        Calculators
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-500">
                        Useful tools to help you plan, calculate and optimize your progress in Forge Master.
                    </span>
                </div>
            </div>
            </div>
            <div className="w-full flex flex-col gap-3">
                <div className="border-2 rounded flex flex-row text-base sm:text-2xl gap-3 p-3 sm:p-6 shadow-lg/20 w-full min-w-0">
                    <WarDayCalculator/>
                </div>
                <div className="border-2 rounded flex flex-row text-base sm:text-2xl gap-3 p-3 sm:p-6 shadow-lg/20 w-full min-w-0">
                    <AscendCalculator/>
                </div>
            </div>
            <div className="border-2 rounded flex flex-col sm:flex-row text-2xl gap-4 p-6 shadow-lg/20 justify-center sm:justify-start items-center sm:items-start">
                <div className="h-14 w-14 sm:h-25 sm:w-25 shrink-0 flex flex-col justify-center items-center">
                    <img src="/icons/gear.png" className="h-14 w-14 sm:h-23 sm:w-23 shrink-0"/>
                </div>
                <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start">
                    <div className="font-bold">
                        Other calculators
                    </div>
                    <div className="text-sm text-zinc-500 text-center sm:text-left">
                        If you got any ideas for other calculators, let me know!
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}
export default CalculatorsPage;