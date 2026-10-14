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
    nickname: string,
    status: PlayerClaimStatus;
    verification_code: string | null;
    expires_at: string;
}
export interface PlayerClaimRowProps{
    player: PlayerType,
    submitting: boolean,
    onClaim: (playerId: string) => void;
}
export type OnboardingStep = "intro" | "choose-player" | "pending" | "verified";


export interface IntroProps{
    understoodHandler: () => void;
}
export interface PlayerClaimProps{
    onClaimCreated: () => void;
}
export interface PendingClaimProps{
    claim: PlayerClaimType;
    onClaimRemove: ()=>void;
}
export interface TokenType{
    verification_code: string,
    expires_at: string
}

export interface PlayerDashboardStats{
    average_last_3: number,
    average_last_3_rank: number,
    average_points: number,
    average_points_rank: number,
    first_scored_war_number: number,
    highest_points: number,
    highest_war_number: number,
    is_member: boolean,
    last_scored_war_number: number,
    lowest_points: number,
    lowest_war_number: number,
    nickname: string,
    player_id: string,
    rank_id: string | null,
    rank_name: string | null,
    rank_sort_order: string | null,
    scored_wars_count: number,
    total_points: number,
    total_points_rank: number
}

export interface DashboardProps{
    playerId: string;
}
export interface PlayerWarHistory{
    war_number: number;
    points: number | null;
}