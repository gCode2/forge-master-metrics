import type { OnboardingStep, PlayerClaimType } from "../../types/types";

function getOnboardingStep(claim: PlayerClaimType | null, understood: boolean) : OnboardingStep {
    if(claim?.status === "verified") return "verified";
    if(claim?.status === "pending") return "pending";
    if(!understood) return "intro";

    return "choose-player";
}

export default getOnboardingStep;