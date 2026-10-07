import { useEffect, useState } from "react";
import PlayerClaim from "../components/claims/PlayerClaim";
import { useAuth } from "../hooks/useAuth";
import Intro from "../components/dashboard/Intro";

function DashboardPage(){
    const {user} = useAuth();
    const [understood, setUnderstood] = useState(getUnderstand())
    function handleUnderstood(){
        setUnderstood(true);
    }

    useEffect(()=>{
        localStorage.setItem("understood", JSON.stringify(understood));
    }, [understood])

    function getUnderstand():boolean{
        const saved = localStorage.getItem("understood");
        if(!saved){
            return false;
        }
        try{
            const parsed = JSON.parse(saved);
            if(typeof parsed !== "boolean"){
                return false;
            }
            return parsed;
        } catch(e: unknown){
            console.error("Couldn't load data from local storage");
            return false;
        }
    }
    function removeUnderstood(){
        localStorage.removeItem("understood");

    }
    // removeUnderstood();

    return (
        <>
            <div className="w-screen flex justify-center items-center py-6">
                <div className="flex flex-col justify-center items-center text-center gap-2 w-125">
                    <div className="text-3xl">
                        Hey <span className="text-orange-400">
                                {user?.user_metadata.display_name}
                            </span>
                    </div>
                    <div>
                        This is your dashboard page.
                    </div>
                    <div>
                        
                    
                        {!understood ? 
                        <Intro understoodHandler={handleUnderstood}/> : <PlayerClaim/>
                    }
                        </div>

                    <div>
                        {/* <PlayerClaim /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardPage;