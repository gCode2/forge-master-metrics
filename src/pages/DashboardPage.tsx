import PlayerClaim from "../components/claims/PlayerClaim";
import { useAuth } from "../hooks/useAuth";

function DashboardPage(){
    const {user} = useAuth();
    return (
        <>
            <div>
                Hey {user?.user_metadata.display_name}, this is your Dashboard Page
            </div>
            <div>
                <PlayerClaim />
            </div>
        </>
    )
}
export default DashboardPage;