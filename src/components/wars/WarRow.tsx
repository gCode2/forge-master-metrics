import { IoIosArrowDropdown } from "react-icons/io";
import type { WarRowProps } from "../../types/types";

function WarRow({war}: WarRowProps){
    return (
        <>
            <div className={`grid grid-cols-5 p-3 border-2 rounded-xl shadow-lg/20 items-center text-center ${war.result === "win" ? "bg-green-300" : (war.result === "loss" ? "bg-red-300" : "bg-gray-300")}`}>
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