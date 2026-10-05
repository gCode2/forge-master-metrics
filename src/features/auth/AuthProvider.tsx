import { createContext, useContext, useEffect, useState} from "react";
import { supabase } from "../../lib/supabase";
import type { Profile, AuthContextValue, AuthProviderProps } from "../../types/types";
import type { Session, User } from "@supabase/supabase-js";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadProfile(userId: string){
        const {data, error} = await supabase.from("profiles").select("*").eq("id", userId).single();
    
        if(error){
            console.error("Failed to load profile:", error);
            setProfile(null);
            return;
        }
        setProfile(data);
    }
    useEffect(()=>{
        let mounted = true;
        async function initializeAuth(){
            const {data: {session}} = await supabase.auth.getSession();
        
        if(!mounted){
            return;
        }
        setSession(session);
        setUser(session?.user ?? null);

        if(session?.user){
            await loadProfile(session.user.id);
        }

        if(mounted){
            setLoading(false)
        }
    }
        initializeAuth();

        const {data: {subscription}} = supabase.auth.onAuthStateChange(async (_event, session)=>{
            if(!mounted) return;
            setSession(session);
            setUser(session?.user ?? null);
            if(session?.user){
                await loadProfile(session.user.id);
            }else{
                setProfile(null);
            }
            setLoading(false);
        })

        return ()=>{
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return (
    <AuthContext.Provider value={{user, session, profile, loading}}>
        {children}
    </AuthContext.Provider>
    );

}
