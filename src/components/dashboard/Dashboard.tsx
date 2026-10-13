import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import type { DashboardProps, PlayerDashboardStats } from "../../types/types";

function Dashboard({playerId} : DashboardProps){

    const [data, setData] = useState<PlayerDashboardStats | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);

    async function getDashboardInfo(){
        setLoading(true);
        setError(null);

        const {data, error} = await supabase.from("v_player_summary").select("*").eq("player_id", playerId).single();
        if(error){
            console.error("Failed to load dashboard data:", error);
            setError("Failed to load dashboard data");
        }
        setData(data);
    }

    useEffect(()=>{
        getDashboardInfo();
    }, [])
    

    return (
        <>
            <div>
                <div className="border-2 w-30 h-30 rounded-xl">

                </div>
            </div>
        </>
    )
}

export default Dashboard;