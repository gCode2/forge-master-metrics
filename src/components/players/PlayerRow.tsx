import { MdOpenInNew } from "react-icons/md";
import type { PlayerRowProps } from "../../types/types";
import { Link } from "react-router";

function PlayerRow({player}:PlayerRowProps){
    const formatNumber = (value: number | string | undefined | null) => {
        if (value === undefined || value === null) return "0";
        const num = Number(value);
        if (isNaN(num)) return "0";
        return num.toLocaleString();
    };
    return (
        <>
            <tr className="border-2">
                <th
                                    scope="row"
                                    className={`${player.is_member ? "bg-white" : "bg-gray-300" } sticky left-0 z-10 border-2 border-gray-500 px-3 py-2 text-left rounded-md grid grid-cols-2 gap-2`}
                                >
                                    <div className="text-center">
                                        {player.nickname}
                                    </div>
                                    <div>
                                        <Link className="flex flex-row justify-end items-center gap-2 text-blue-500" to={`/players/${player.nickname}`}>
                                        More <MdOpenInNew/>
                                        </Link>
                                    </div>
                                    
                                </th>
                <td className="border-2 border-gray-500 px-2 py-2 text-center tabular-nums rounded-md">
                    {formatNumber(Math.floor(player.total_points))}
                </td>
                <td className="border-2 border-gray-500 px-2 py-2 text-center tabular-nums rounded-md">
                    {formatNumber(Math.floor(player.average_points))}
                </td>
                <td className="border-2 border-gray-500 px-2 py-2 text-center tabular-nums rounded-md">
                    {formatNumber(Math.floor(player.average_last_3))}
                </td>
            </tr>
        </>
    )
}
export default PlayerRow;