import { useState } from "react";
import type { PendingClaimProps } from "../../types/types";
import { supabase } from "../../lib/supabase";

function PendingClaim({ claim, onClaimRemove }: PendingClaimProps) {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleCancel() {
        setSubmitting(true);
        setError(null);

        const { error } = await supabase.from("player_claims").delete().eq("id", claim.id);

        setSubmitting(false);
        if (error) {
            console.error("Failed to cancel player claim:", error);
            setError("Could not cancel the claim");
            return;
        }
        onClaimRemove();
    }

    return (
        <div className="flex flex-col gap-4 max-w-xl mx-auto p-4 sm:p-6 bg-white border-1 rounded-lg">
            <div>
                <div className="font-bold text-2xl text-gray-800">Claim success!</div>
                <div className="text-gray-600 mt-1">
                    You've made a claim to be
                    <span className="font-bold text-green-600">{" " + claim.nickname}</span>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-100 flex flex-col gap-3">
                <div className="text-sm sm:text-base">
                    Your verification token:{" "}
                    <span className="font-mono font-semibold bg-gray-200 px-1.5 py-0.5 rounded text-gray-800 select-all">
                        {claim.verification_code}
                    </span>
                </div>
                
                <div className="text-sm text-gray-700 font-medium">
                    To get your identity approved, please copy your verification token and send it using one of the following methods:
                </div>

                <ol className="list-decimal list-inside flex flex-col gap-2 text-sm sm:text-base text-gray-700">
                    <li className="pl-1">
                        Paste it in the in-game chat so the Clan Leader can see it.
                    </li>
                    <li className="pl-1">
                        Send it to <span className="inline-block px-1.5 py-0.5 my-0.5 rounded bg-blue-100 text-blue-800 font-medium text-xs sm:text-sm">💬・chat-ogólny</span> in our Discord.
                    </li>
                    <li className="pl-1">
                        Send it via DM to <span className="inline-block px-1.5 py-0.5 my-0.5 rounded bg-blue-100 text-blue-800 font-medium text-xs sm:text-sm">@gcode2</span> in Discord.
                    </li>
                </ol>
            </div>

            <div className="text-sm">
                Claim status:
                <span className="text-orange-500 font-bold">{" " + claim.status}</span>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div>
                <button type="button"
                    className="bg-gray-400 hover:bg-gray-300 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-400 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black text-sm"
                    onClick={handleCancel}
                    disabled={submitting}
                >
                {submitting ? "Canceling..." : "Cancel"}
            </button>
            </div>
        </div>
    );
}
export default PendingClaim;