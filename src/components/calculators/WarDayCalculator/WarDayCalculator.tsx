
import { useState } from "react";

import { warActions } from "../../../data/warDay";

import { warDaysActions } from "../../../data/warDay";

function WarDayCalculator() {
    const [selectedDay, setSelectedDay] = useState(1);

    const daysIds = warDaysActions[selectedDay-1] || [];

    const filteredActions = warActions.filter(actionGroup=>{
        return daysIds.includes(actionGroup.id)
    })
    
    function handleDayChange(dayNumber: number){
        setSelectedDay(dayNumber);
    }

    return (
        <section className="flex flex-col gap-3 text-sm">
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
            <div>
                {
                    filteredActions.map(group=>{
                        const hasCustom = Boolean(group.customAction);

                        const actionList = group.actions || [];

                        return(
                            <div key={group.id}>
                                {hasCustom && group.customAction ? (
                                    <span>{group.customAction.name} ({group.customAction.defaultPoints})</span>
                                ) : (
                                    <div>
                                        {
                                            actionList.map((act, actIndex)=> (
                                                <div>
                                                    {act.name} ({act.defaultPoints})
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        )

                    })
                }
            </div>
        </section>
    );
}

export default WarDayCalculator;
