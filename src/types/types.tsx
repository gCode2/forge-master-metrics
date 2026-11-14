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
    claimedPlayerId: string | null;
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

export interface PlayerStats{
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
    rank_sort_order: number | null,
    // 
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

export interface PlayersListProps{
    players: PlayerStats[],
    sortHandler: (field: SortField)=>void;
    sortOrder: string | null;
    sortField: string | null;
    claimedPlayerId: string | null;
}
export interface PlayerRowProps{
    player: PlayerStats;
    claimedPlayerId: string | null;
}
export interface DetailedPlayersListProps{
    players: PlayerStats[];
    wars: WarColumn[];
    pointsByPlayer: PlayerWarPoints;
    sortOrder: string | null;
    sortField: string | null;
    sortHandler:(field: SortField) => void;
    claimedPlayerId: string | null;
}
export interface WarColumn {
    id: string;
    war_number: number;
    result: string;
}
export interface War {
    war_id: string;
    war_number: number;
    enemy_name: string;
    status: string;
    result: string;
    min_points: number;
    max_points: number;
    tier_points_delta: number;
    participant_count: number;
    total_points: number;
    total_points_growth_percentage?: number | null;
    war_daily_stats: WarDay[];
}

export interface WarDay{
    day_number: number;
    total_points: number;
    growth_percentage?: number | null;
}

export type PlayerWarPoints = Record<
    string,
    Record<string, number | null>
>;
 
 export type SortField = | "nickname" | "total" | "avg" | "last_3_avg" | `war:${string}` | null

 export interface WarsListProps{
    wars: War[];
 }
 export interface WarRowProps{
    war: War;
 }

 export interface WarDayAction {
    key: string,
    name: string,
 }

 export interface WarDayActionMapping{
    key: string,
    points:number
 }

 export interface WarDayData {
    day: number,
    actions: WarDayActionMapping[]
 }

 export type ActionSegments = Record<string, WarDayAction[]>;


 export interface warDayActionsType {
    id: number,
    name: string,
    actions: warDayAction[],
    customAction?:{
        name: string,
        defaultPoints: number
    },
    defaultCost?:number
 }
 export interface warDayAction{
    name: string,
    defaultPoints:number
 }

 export interface forgeLevelType{
    level: number,
    totalCost: number | null,
    totalSummon: number | null,
    gemCost: number | null,
    time: number | null,
    chances: forgeChancesType
 }

 export interface forgeChancesType{
    primitive: number,
    medieval: number,
    earlyModern: number,
    modern: number,
    space: number,
    interstellar: number,
    multiverse: number,
    quantum: number,
    underworld: number,
    divine: number
 }

  export interface skillLevelType{
    level:number,
    summon: number | null,
    totalSummon: number | null,
    cost: number | null,
    totalCost: number | null,
    chances: skillChancesType
 }

 export interface skillChancesType{
    common: number,
    rare: number,
    epic: number,
    legendary: number,
    ultimate: number,
    mythic: number,
 }

export interface mountLevelType{
    level:number,
    summon: number | null,
    totalSummon: number | null,
    cost: number | null,
    totalCost: number | null,
    chances: mountChancesType
 }

export interface mountChancesType{
    common: number,
    rare: number,
    epic: number,
    legendary: number,
    ultimate: number,
    mythic: number,
 }

 export interface petLevelType{
    level:number,
    summon: number | null,
    totalSummon: number | null,
    cost: number | null,
    totalCost: number | null,
    chances: petChancesType
 }

export interface petChancesType{
    common: number,
    rare: number,
    epic: number,
    legendary: number,
    ultimate: number,
    mythic: number,
 }

 export interface AppNavigationProps{
    isMenuOpened: boolean,
    setMenuOpened: (isMenuOpened: boolean)=>void;
 }

 export type WarCalculatorState = {
    selectedDay: number,
    quantities: Record<string, number>,
    customPoints: Record<string, number>,
    specialSettings: Record<string,number>,
    selectedForgeLevel: number,
    showAdvancedMode: boolean,
 }

 export type AscendCalculatorState = {
    selectedResource: string,
    resourceQuantities: Record<string, number>,
    resourceCosts: Record<string, number>,
    resourceBonuses: Record<string, number>
 }

 export interface SearchBarProps{
    searchText: string,
    changeHandler: (text:string) => void
 }

 export interface AscendResource{
    id: number,
    resource: string,
    defaultCost: number,
    levels: AscendResourceUnion
 }

 export type AscendResourceUnion = forgeLevelType[] | mountLevelType[] | petLevelType[] | skillLevelType[]

 export type AscendResources = AscendResource[]