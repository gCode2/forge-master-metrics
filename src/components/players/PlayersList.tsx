import type { PlayersListProps } from "../../types/types";
import PlayerRow from "./PlayerRow";



function PlayersList({players}:PlayersListProps){
    
    return (
        <>
            <table className="w-full table-auto gap-1">
                <thead>
                <tr className="border-2">
                    <th>
                        Nickname
                    </th>
                    <th>
                        Total points
                    </th>
                    <th>
                        Average points
                    </th>
                    <th>
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