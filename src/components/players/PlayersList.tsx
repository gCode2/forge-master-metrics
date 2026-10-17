import { FaSort, FaSortAmountDownAlt, FaSortAmountUpAlt, FaSortDown, FaSortUp } from "react-icons/fa";
import type { PlayersListProps } from "../../types/types";
import PlayerRow from "./PlayerRow";

function PlayersList({players, sortHandler, sortOrder, sortField}:PlayersListProps){
    return (
        <>
            <table className="min-w-full border-separate border-spacing-0.5 text-sm px-3 py-1">
                    <thead className="sticky top-0 z-20 bg-white">
                        <tr>
                            <th
                                className="sticky left-0 z-30 border-2 px-3 py-2 text-left rounded-md text-lg bg-white"
                            >
                                <div className="flex flex-row justify-between">
                                    <div>
                                    Nickname
                                </div>
                                <button className="p-1 bg-zinc-300 rounded-lg text-sm hover:bg-zinc-200 hover:cursor-pointer w-10 flex justify-center items-center ring-1 ring-black border-b-4 border-b-zinc-700" onClick={()=>sortHandler("nickname")}>
                                    {sortField === "nickname" ? 
                                    (sortOrder === "asc" ? <FaSortUp/> 
                                        : (sortOrder === "desc") ?  <FaSortDown/> 
                                        : <FaSort/>) 
                                    : <FaSort/>
                                    }
                                </button>
                                </div>
                                
                            </th>
                            <th
                                className="sticky left-0 z-30 border-2 px-3 py-2 text-left rounded-md text-lg bg-white"
                            >
                                <div className="flex flex-row justify-between">
                                    <div>
                                    Total points
                                </div>
                                <button className={`${
                                    sortField === "total" ? (
                                        sortOrder === "asc" ? "bg-red-500 hover:bg-red-400 border-b-red-800" : sortOrder === "desc" ? "bg-green-500 hover:bg-green-400 border-b-green-800" : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"
                                    ) : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"} 
                                     p-1 rounded-lg text-sm hover:cursor-pointer w-10 flex justify-center items-center border-b-4 ring-1 ring-black`} onClick={()=>sortHandler("total")}>
                                    {sortField === "total" ? 
                                    (sortOrder === "asc" ? <FaSortUp /> 
                                        : (sortOrder === "desc") ?  <FaSortDown/> 
                                        : <FaSort/>) 
                                    : <FaSort/>
                                    }
                                </button>
                                </div>
                                
                            </th>
                            <th
                                className="sticky left-0 z-30 border-2 px-3 py-2 text-left rounded-md text-lg bg-white"
                            >
                                <div className="flex flex-row justify-between">
                                    <div>
                                    Average points
                                </div>
                                <button className={`${
                                    sortField === "avg" ? (
                                        sortOrder === "asc" ? "bg-red-500 hover:bg-red-400 border-b-red-800" : sortOrder === "desc" ? "bg-green-500 hover:bg-green-400 border-b-green-800" : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"
                                    ) : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"} 
                                     p-1 rounded-lg text-sm hover:cursor-pointer w-10 flex justify-center items-center border-b-4 ring-1 ring-black`}onClick={()=>sortHandler("avg")}>
                                    {sortField === "avg" ? 
                                    (sortOrder === "asc" ? <FaSortUp /> 
                                        : (sortOrder === "desc") ?  <FaSortDown/> 
                                        : <FaSort/>) 
                                    : <FaSort/>
                                    }
                                </button>
                                </div>
                                
                            </th>
                            <th
                                className="sticky left-0 z-30 border-2 px-3 py-2 text-left rounded-md text-lg bg-white"
                            >
                                <div className="flex flex-row justify-between">
                                    <div>
                                    Last 3 average
                                </div>
                                <button className={`${
                                    sortField === "last_3_avg" ? (
                                        sortOrder === "asc" ? "bg-red-500 hover:bg-red-400 border-b-red-800" : sortOrder === "desc" ? "bg-green-500 hover:bg-green-400 border-b-green-800" : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"
                                    ) : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"} 
                                     p-1 rounded-lg text-sm hover:cursor-pointer w-10 flex justify-center items-center border-b-4 ring-1 ring-black`}onClick={()=>sortHandler("last_3_avg")}>
                                    {sortField === "last_3_avg" ? 
                                    (sortOrder === "asc" ? <FaSortUp /> 
                                        : (sortOrder === "desc") ?  <FaSortDown/> 
                                        : <FaSort/>) 
                                    : <FaSort/>
                                    }
                                </button>
                                </div>
                                
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {players.map(player=>(
                            <PlayerRow key={player.player_id} player={player}/>
                        ))}
                    </tbody>
                </table>
        </>
    )
}

export default PlayersList;