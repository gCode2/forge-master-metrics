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