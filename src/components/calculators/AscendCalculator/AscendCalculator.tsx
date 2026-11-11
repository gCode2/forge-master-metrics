import { useState } from "react";
import type { AscendCalculatorState } from "../../../types/types";
import { ascendResources } from "../../../data/ascend";

const DEFAULT_STATE: AscendCalculatorState = {
    selectedResource: "Forge",

}

function AscendCalculator(){
    const [calculatorState, setCalculatorState] = useState<AscendCalculatorState>(DEFAULT_STATE);


    function renderResourceContent(resource:string){
        switch(resource){
                                    case "Forge":
                                        return (
                                            <div>
                                                <div className="text-xl font-bold">
                                                    Forge
                                                </div>
                                                <div>
                                                    <div>
                                                        How many coins
                                                    </div>
                                                    <div>
                                                        Forge speed up %
                                                    </div>
                                                    <div>
                                                        Forge cost decrease %
                                                    </div>
                                                    <div>
                                                        Using gems?
                                                    </div>
                                                </div>
                                                <div>
                                                    Summary
                                                </div>
                                            </div>
                                        )
                                    case "Skills":
                                        return (
                                            <div>
                                                <div className="text-xl font-bold">
                                                    Skills
                                                </div>
                                                <div>
                                                    <div>
                                                        How many tickets
                                                    </div>
                                                    <div>
                                                        Ticket cost / Ticket disconut %
                                                    </div>
                                                </div>
                                                <div>
                                                    Summary
                                                </div>
                                            </div>
                                        )
                                    case "Pets":
                                        return (
                                            <div>
                                                <div className="text-xl font-bold">
                                                    Pets
                                                </div>
                                                <div>
                                                    <div>
                                                        How many eggs
                                                    </div>
                                                    <div>
                                                        Summon cost / Summon disconut %
                                                    </div>
                                                </div>
                                                <div>
                                                    Summary
                                                </div>
                                            </div>
                                        )
                                    case "Mounts":
                                        return (
                                            <div>
                                                <div className="text-xl font-bold">
                                                    Mounts
                                                </div>
                                                <div>
                                                    <div>
                                                        How many clockwiders
                                                    </div>
                                                    <div>
                                                        Summon cost / Summon disconut %
                                                    </div>
                                                </div>
                                                <div>
                                                    Summary
                                                </div>
                                            </div>
                                        )
                                    default:
                                        return (
                                            <div>
                                            <div className="text-xl font-bold">
                                                Couldn't load resource form
                                            </div>
                                            </div>
                                        )
                                }
    }

    return (
        <>
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
                <div className="mt-6 w-full">
                    <section className="flex flex-col gap-4 sm:gap-5 text-sm min-w-0 w-full">
                        <div className="border-2 rounded-md p-3 flex flex-col gap-4 shadow-lg/20">
                            <label className="flex flex-row gap-1 font-medium justify-between items-center font-medium w-full bg-gray-50 p-1 border-1 border-gray-200">
                                Select a resource
                                <select
                                    value={calculatorState.selectedResource}
                                    onChange={(e)=>{
                                        setCalculatorState(prev=> ({
                                            ...prev,
                                            selectedResource: e.target.value
                                        }))
                                    }}
                                    className="border rounded-sm px-2 py-1 bg-white">
                                    {ascendResources.map(resource=> (
                                        <option key={resource.id} value={resource.resource}>
                                            {resource.resource}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div className="flex flex-col gap-3">
                                {renderResourceContent(calculatorState.selectedResource)}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default AscendCalculator;