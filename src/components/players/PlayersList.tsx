import type { PlayersListProps } from "../../types/types";
import PlayerRow from "./PlayerRow";

function PlayersList({players}:PlayersListProps){
    
    return (
        <>
            <table className="min-w-full border-separate border-spacing-0.5 text-sm px-3 py-1">
                    <thead className="sticky top-0 z-20 bg-white">
                        <tr>
                            <th
                                className="sticky left-0 z-30 border-2 px-3 py-2 text-center rounded-md text-lg bg-white"
                            >
                                Nickname
                            </th>
                            <th
                                className="sticky left-0 z-30 border-2 px-3 py-2 text-center rounded-md text-lg bg-white"
                            >
                                Total points
                            </th>
                            <th
                                className="sticky left-0 z-30 border-2 px-3 py-2 text-center rounded-md text-lg bg-white"
                            >
                                Average points
                            </th>
                            <th
                                className="sticky left-0 z-30 border-2 px-3 py-2 text-center rounded-md text-lg bg-white"
                            >
                                Last 3 average
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