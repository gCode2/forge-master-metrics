import type { DetailedPlayersListProps } from "../../types/types";





function formatCompactPoints(
    value: number | string | null | undefined
): string {
    if (value == null || value === "") return "—";

    const points = Number(value);

    if (!Number.isFinite(points)) return "—";

    if (points >= 1_000_000) {
        return `${(
            Math.round(points / 10_000) / 100
        ).toFixed(2)}m`;
    }

    if (points >= 1_000) {
        return `${Math.round(points / 1_000)}k`;
    }

    return Math.round(points).toLocaleString("pl-PL");
}

function DetailedPlayersList({
    players,
    wars,
    pointsByPlayer,
}: DetailedPlayersListProps) {
    if (wars.length === 0) {
        return <p>No wars available.</p>;
    }

    return (
        <div className="w-full min-w-0">
            <div className="max-h-[70dvh] w-full overflow-auto rounded border">
                <table className="w-max min-w-full border-separate border-spacing-0 text-sm">
                    <thead className="sticky top-0 z-20">
                        <tr>
                            <th
                                rowSpan={2}
                                className="sticky left-0 z-30 min-w-36 border bg-zinc-800 px-3 py-2 text-left text-white"
                            >
                                Nickname
                            </th>

                            <th
                                colSpan={wars.length}
                                className="border bg-zinc-800 px-3 py-2 text-center text-white"
                            >
                                Wars
                            </th>
                        </tr>

                        <tr>
                            {wars.map((war) => (
                                <th
                                    key={war.id}
                                    className="w-16 min-w-16 border bg-zinc-700 px-2 py-2 text-center text-white"
                                >
                                    {war.war_number}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player) => (
                            <tr key={player.player_id}>
                                <th
                                    scope="row"
                                    className="sticky left-0 z-10 border bg-white px-3 py-2 text-left"
                                >
                                    {player.nickname}
                                </th>

                                {wars.map((war) => {
                                    const points =
                                        pointsByPlayer[player.player_id]?.[
                                            war.id
                                        ];

                                    return (
                                        <td
                                            key={war.id}
                                            title={
                                                points == null
                                                    ? "Brak zapisanego wyniku"
                                                    : `${Number(points).toLocaleString("pl-PL")} pkt`
                                            }
                                            className="border px-2 py-2 text-center tabular-nums"
                                        >
                                            {formatCompactPoints(points)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DetailedPlayersList;