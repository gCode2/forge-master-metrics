import { IoIosArrowDropdown} from "react-icons/io";
import type { WarRowProps } from "../../types/types";
import { useState } from "react";

function WarRow({war}: WarRowProps){
    const [isExpanded, setExpanded] = useState(false);
    function handleExpand(){
        setExpanded(!isExpanded);
    }

    const formatNumber = (value: number | string | undefined | null) => {
        if (value === undefined || value === null) return "0";
        const num = Number(value);
        if (isNaN(num)) return "0";
        return num.toLocaleString();
    };

    return (
        <>
            <div className="grid grid-cols-6 p-3 border-2 rounded-xl shadow-lg/20 items-center text-center">
                <div>
                    #{war.war_number}
                </div>
                <div className="truncate">
                    {war.enemy_name}
                </div>
                <div className="grid grid-cols-2">
                    {formatNumber(war.total_points)}

                    {war.total_points_growth_percentage != null ? (
                        <span className={`text-sm font-bold ${war.total_points_growth_percentage > 0 ? "text-green-400" : "text-red-400"}`}>
                            (
                                {
                                    war.total_points_growth_percentage > 0 ? "+" : ""
                                }
                                {
                                    war.total_points_growth_percentage.toFixed(2) + "%"
                                }
                            )
                        </span>
                    ) : <span className="text-sm font-bold text-gray-400">
                        ( - )
                        </span>}
                </div>
                <div>
                    {war.participant_count}
                </div>
                <div className={`flex flex-row justify-center items-center border-2 rounded-lg w-13 justify-self-center ${war.result === "win" ? "bg-green-500 border-green-600" : (war.result === "loss" ? "bg-red-500 border-red-700" : "bg-gray-500 border-gray-600")} text-white font-bold`}>
                        {war.result}
                </div>
                <div className="flex justify-center">
                    <button className="flex flex-row justify-between items-center gap-1 bg-zinc-400 enabled:hover:bg-zinc-300 text-white font-bold py-1 px-4 border-b-4 w-35 border-zinc-700 enabled:hover:border-zinc-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black" onClick={handleExpand}>
                        
                        <span className="flex-1">
                            {!isExpanded ? "More info" : "Less info"}
                        </span>
                        <span className="text-xl">
                            <IoIosArrowDropdown className={`transition-all duration-200 ${!isExpanded ? "rotate-0" : "-rotate-180"}`}/>
                        </span>
                    
                        
                    </button>
                </div>
                
                
                <div className={`bg-gray-300 col-span-full flex flex-row justify-center items-center rounded p-0 m-0 transition-all duration-400 invisible h-0 overflow-hidden border-invisible border-gray-500 ${isExpanded && "visible h-18 p-3 m-2 border-2"}`}>
                    <table className="w-full p-10">
                        <thead>
                            <tr>
                                <th>
                                    Day 1
                                </th>
                                <th>
                                    Day 2
                                </th>
                                <th>
                                    Day 3
                                </th>
                                <th>
                                    Day 4
                                </th>
                                <th>
                                    Day 5
                                </th>
                                <th>
                                    Day 6
                                </th>
                            </tr>
                            
                        </thead>
                        <tbody>
                        <tr>
                        {war.war_daily_stats.map(warDay=>(
                            <td key={crypto.randomUUID()}>
                                {formatNumber(warDay.total_points)}
                            </td>
                        ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </>
    )
}
export default WarRow;