import type { PlayerClaimRowProps } from "../../../types/types";

function PlayerClaimRow({player, claim, submitting, onClaim, onCancel} : PlayerClaimRowProps){

    const isPending = claim?.status === "pending";
    const isVerified = claim?.status === "verified";
    return (
        <li className="flex flex-row border-1 justify-between items-center py-1 px-2 rounded">
            <span>
                {player.nickname}
            </span>

            {isPending && (
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-yellow-600 font-bold text-sm">
                        Pending
                    </span>

                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black text-sm"
                        onClick={() => onCancel(claim.id)}
                        disabled={submitting}
                    >
                        {submitting ? "Cancelling..." : "Cancel"}
                    </button>
                </div>
            )}

            {isVerified && (
                <span className="text-green-600 font-bold text-sm">
                    Verified
                </span>
            )}

            {!claim && (
                <button
                    type="button"
                    className="flex flex-row justify-center items-center bg-green-500 enabled:hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 enabled:hover:border-green-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black w-25 text-sm"
                    onClick={() => onClaim(player.id)}
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Claim"}
                </button>
            )}
        </li>
    );
}
export default PlayerClaimRow;