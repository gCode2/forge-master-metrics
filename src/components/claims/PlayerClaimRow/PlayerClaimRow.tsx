import type { PlayerClaimRowProps } from "../../../types/types";

function PlayerClaimRow({player, submitting, onClaim} : PlayerClaimRowProps){

    return (
        <li className="flex flex-row border-1 justify-between items-center py-1 px-2 rounded">
            <span>
                {player.nickname}
            </span>

                <button
                    type="button"
                    className="flex flex-row justify-center items-center bg-green-500 enabled:hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 enabled:hover:border-green-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black w-25 text-sm"
                    onClick={() => onClaim(player.id)}
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Claim"}
                </button>
            
        </li>
    );
}
export default PlayerClaimRow;