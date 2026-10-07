import type {Session, User} from "@supabase/supabase-js";
import type { ReactNode } from "react";
export interface Profile {
    id: string,
    display_name: string | null,
    avatar_path: string | null,
    role: "admin" | "member",
    created_at: string,
    updated_at: string
}

export interface AuthContextValue {
    user: User | null;
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
}
export interface AuthProviderProps{
    children: ReactNode;
}
export interface PlayerType{
    id: string,
    nickname: string,
}
export type PlayerClaimStatus = "pending" | "verified" | "rejected" | "revoked"

export interface PlayerClaimType{
    id: string,
    player_id: string;
    status: PlayerClaimStatus;
}
export interface PlayerClaimRowProps{
    player: PlayerType,
    claim?: PlayerClaimType,
    submitting: boolean,
    onClaim: (playerId: string) => void;
    onCancel: (playerId: string) => void;
}
export type OnboardingStep = "intro" | "choose-player" | "pending" | "verified";


export interface IntroProps{
    understoodHandler: () => void;
}