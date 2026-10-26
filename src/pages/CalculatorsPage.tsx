import { Link } from "react-router";

import {war_days_base_points} from "../data/warDaysPoints.ts";
import {actionSegments} from "../data/warDayActions.ts";


import type { WarDayData } from "../types/types";
import { useState } from "react";

function CalculatorsPage () {
    const [selectedDay, setSelectedDay] = useState<WarDayData | null>(null)

        // console.log(war_days_base_points);
        // console.log(actionSegments)
    return (
        <>
        <main className="flex flex-1 flex-col w-full p-6 gap-2">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-3 items-center border-2 rounded w-full h-25 shadow-lg/20 px-6">
                    <div>
                        <img src="/icons/calculator.png" className="h-16 w-16"/>
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-start">
                        <div>
                            <span className="text-4xl font-black">
                                Calculators
                            </span>
                        </div>
                        <div className="ml-1 text-sm text-zinc-500">
                            Useful tools to help you plan, calculate and optimize your progress in Forge Master.
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="border-2 rounded flex flex-row text-2xl gap-3 p-6 shadow-lg/20 ">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row justify-center items-center gap-5">
                            <div>
                                <img src="/icons/war_points.png" className="h-25 w-25"/>
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
                        <div className="text-sm">
                            <div className="bg-red-100">
                                <div className="text-lg">
                                    Provide your bonuses
                                </div>
                            </div>
                            <div className="bg-red-100">
                                <div className="text-lg">
                                    Select a War Day
                                </div>
                                <div>
                                    <select>
                                        
                                            {war_days_base_points.map((day: WarDayData)=>(
                                                <option key={day.day}>
                                                    Day {day.day}
                                                </option>
                                            ))}
                                        
                                    </select>
                                </div>
                                <div>

                                </div>
                            </div>
                            {/* <form className="max-w-sm">
                                <label htmlFor="countries" className="block mb-2.5 text-sm font-medium text-heading">Select an option</label>
                                <select id="countries" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                                    <option selected>Choose a country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </form> */}
                        </div>
                    </div>
                </div>
                <div className="border-2 rounded flex flex-row text-2xl gap-3 p-6 shadow-lg/20 ">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row justify-center items-center gap-5">
                            <div>
                                <img src="/icons/ascend.png" className="h-25 w-25"/>
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
                        <div className="text-sm text-zinc-500 pt-2 ml-30">
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
                            <Link to="/calculators/ascend"
                                className="flex flex-row justify-center items-center text-white font-bold py-2 px-4 transition duration-200 text-sm enabled:hover:cursor-pointer rounded ring-1 ring-black bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500"
                            >
                                Open Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-2 rounded flex flex-row text-2xl gap-3 p-6 shadow-lg/20 ">
                <div>
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