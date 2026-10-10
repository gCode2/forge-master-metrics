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
        <div>
            <div className="font-bold text-xl">Claim success!</div>
            <div>
                You've made a claim to be
                <span className="font-bold text-green-500">{" " + claim.nickname}</span>
            </div>
            <div>
                <div>Your verification token: {claim.verification_code}</div>
                <div>
                    To get your identity approved, please copy your verification token and send it using one of the following methods:
                </div>
                <ol className="list-decimal flex flex-col gap-1">
                    <li>Paste it in the in-game chat so the Clan Leader can see it.</li>
                    <li>
                        Send it to <span className="p-0.5 rounded bg-blue-200">💬・chat-ogólny</span> in our Discord
                    </li>
                    <li>
                        Send it via DM to <span className="p-0.5 rounded bg-blue-200">@gcode2</span> in Discord
                    </li>
                </ol>
            </div>
            <div>
                Claim status:
                <span className="text-orange-500">{" " + claim.status}</span>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
                type="button"
                className="bg-gray-400 hover:bg-gray-300 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-400 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black text-sm"
                onClick={handleCancel}
                disabled={submitting}
            >
                {submitting ? "Canceling..." : "Cancel"}
            </button>
        </div>
    );
}
export default PendingClaim;