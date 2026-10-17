import type { PlayerRowProps } from "../../types/types";

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
                <td>
                    {player.nickname}
                </td>
                <td>
                    {formatNumber(Math.floor(player.total_points))}
                </td>
                <td>
                    {formatNumber(Math.floor(player.average_points))}
                </td>
                <td>
                    {formatNumber(Math.floor(player.average_last_3))}
                </td>
            </tr>
        </>
    )
}
export default PlayerRow;