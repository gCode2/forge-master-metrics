import { useState } from "react";
import type { AscendCalculatorState } from "../../../types/types";
import { ascendResources } from "../../../data/ascend";
import NumberField from "../components/NumberField";

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
                                                <div className="flex flex-col gap-3">
                                                    <div>
                                                        <NumberField label="Coins:" value={3} onChange={()=>{}}/>
                                                    </div>
                                                    <div>
                                                        <NumberField label="Forge speed up (%)" value={3} onChange={()=>{}}/>
                                                    </div>
                                                    <div>
                                                        <NumberField label="Forge cost decrease (%)" value={3} onChange={()=>{}}/>
                                                    </div>
                                                    <div>
                                                        Using gems?
                                                        slider
                                                    </div>
                                                </div>
                                                <div>
                                                    Summary + info
                                                </div>
                                            </div>
                                        )
                                    case "Skills":
                                        return (
                                            <div>
                                                <div className="text-xl font-bold">
                                                    Skills
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <div>
                                                        <NumberField label="Tickets:" value={3} onChange={()=>{}}/>
                                                    </div>
                                                    <div>
                                                        <NumberField label="Summon cost:" value={3} onChange={()=>{}}/>
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
                                                <div className="flex flex-col gap-3">
                                                    <div>
                                                        <NumberField label="Eggs:" value={3} onChange={()=>{}}/>
                                                    </div>
                                                    <div>
                                                        <NumberField label="Summon cost:" value={3} onChange={()=>{}}/>
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
                                                <div className="flex flex-col gap-3">
                                                    <div>
                                                        <NumberField label="Clockwiders:" value={3} onChange={()=>{}}/>
                                                    </div>
                                                    <div>
                                                        <NumberField label="Summon cost" value={3} onChange={()=>{}}/>
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
                                                    Something went wrong.
                                                </div>
                                                <div className="text-base">
                                                    Provided wrong resource. Refresh and try again.
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
                            <div className="text-xl font-bold text-center sm:text-left">
                                Select Ascension
                            </div>
                            <div className="grid grid-cols-4 sm:flex sm:flex-row gap-2 sm:gap-2 items-center justify-center">
                            {ascendResources.map((resource) => (
                                    
                                        <button
                                        type="button"
                                        key={resource.id}
                                        className={`
                                        flex flex-row justify-around items-center
                                        text-white font-medium py-1 px-1 sm:px-2
                                        transition duration-200 sm:w-21
                                        rounded ring-1 ring-black border-b-4
                                        text-[10px] hover:cursor-pointer
                                        ${calculatorState.selectedResource === resource.resource
                                            ? "bg-orange-400 border-orange-500 hover:bg-orange-300"
                                            : "bg-gray-400 border-gray-500 hover:bg-gray-300"}
                                        `}
                                        onClick={() => setCalculatorState(prev=>({
                                            ...prev,
                                            selectedResource: resource.resource
                                        }))}>
                                            <div className="flex flex-row items-center justify-center gap-1 w-full h-6">
                                                <div
                                                    className="w-6 h-6 shrink-0"
                                                    style={{
                                                        backgroundImage: "url('/icons/ICONS.png')",
                                                        backgroundSize: "186px 186px",
                                                        backgroundPosition: `${
                                                            resource.resource === "Forge" ? "-23px 1px" :
                                                            resource.resource === "Skills" ? "-162px 1px" :
                                                            resource.resource === "Pets" ? "-23px -92px" :
                                                            resource.resource === "Mounts" ? "-93px -69px" : "0px 0px"
                                                        }`,
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