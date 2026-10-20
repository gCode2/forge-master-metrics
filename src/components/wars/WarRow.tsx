import { IoIosArrowDropdown } from "react-icons/io";
import type { WarRowProps } from "../../types/types";

function WarRow({war}: WarRowProps){
    return (
        <>
            <div className="grid grid-cols-6 p-3 border-2 rounded-xl shadow-lg/20 items-center text-center">
                <div>
                    #{war.war_number}
                </div>
                <div className="truncate">
                    {war.enemy_name}
                </div>
                <div>
                    {war.total_points}
                </div>
                <div>
                    {war.participant_count}
                </div>
                <div className={`flex flex-row justify-center items-center border-2 rounded-lg w-13 justify-self-center ${war.result === "win" ? "bg-green-500 border-green-600" : (war.result === "loss" ? "bg-red-500 border-red-700" : "bg-gray-500 border-gray-600")} text-white font-bold`}>
                        {war.result}
                </div>
                <div className="flex justify-center">
                    <button className="flex flex-row justify-center items-center gap-1 bg-zinc-400 enabled:hover:bg-zinc-300 text-white font-bold py-1 px-4 border-b-4 border-zinc-700 enabled:hover:border-zinc-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black">
                        <span>
                            Show more
                        </span>
                        <span className="text-xl">
                            <IoIosArrowDropdown/>
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}
export default WarRow;