import { Link } from "react-router";
import WarDayCalculator from "../components/calculators/WarDayCalculator/WarDayCalculator.tsx";

function CalculatorsPage () {

    return (
        <>
        <main className="flex flex-1 flex-col w-full p-6 gap-2">
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
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex flex-row justify-start items-center gap-5">
                            <div className="h-16 w-16 sm:h-25 sm:w-25 shrink-0">
                                <img src="/icons/war_points.png" className="h-16 w-16 sm:h-25 sm:w-25 shrink-0"/>
                            </div>
                            <div className="flex flex-col">
                                <div className="font-bold">
                                War Points Calculator
                                </div>
                                <div className="text-sm text-zinc-500">
                                    Calculate how many points you'll earn in a war based on your bonuses and available resources.
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 w-full">
                            <WarDayCalculator/>
                        </div>
                    </div>
                </div>
                <div className="border-2 rounded flex flex-row text-base sm:text-2xl gap-3 p-3 sm:p-6 shadow-lg/20 w-full min-w-0">
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
                        <div className="text-sm text-zinc-500 pt-2 ml-0 sm:ml-30">
                            <ul className="space-y-1 text-body list-inside">
                                <li>
                                    <span className="text-orange-400 mr-3">✔</span>
                                    Input your current level</li>
                                <li>
                                    <span className="text-orange-400 mr-3">✔</span> See required resources</li>
                                <li>
                                    <span className="text-orange-400 mr-3">✔</span> Plan your progression</li>
                            </ul>
                        </div>
                        <div className="flex flex-row justify-end pt-2">
                            <Link to="/calculators"
                                className="flex flex-row justify-center items-center text-white font-bold py-2 px-4 transition duration-200 text-sm enabled:hover:cursor-pointer rounded ring-1 ring-black bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500"
                            >
                                Open Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-2 rounded flex flex-row text-2xl gap-4 p-6 shadow-lg/20 ">
                <div className="h-16 w-16shrink-0">
                    <img src="/icons/gear.png" className="h-16 w-16"/>
                </div>
                <div className="flex flex-col">
                    <div className="text-4xl font-bold">
                        Other calculators
                    </div>
                    <div className="text-sm text-zinc-500">
                        If you got any ideas for other calculators, just let me know!
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}
export default CalculatorsPage;