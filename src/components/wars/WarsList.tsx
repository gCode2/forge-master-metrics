import type { WarsListProps } from "../../types/types";
import WarRow from "./WarRow";

function WarsList({wars}: WarsListProps){
    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <div className="grid grid-cols-6 p-3 border-2 rounded-xl items-center text-center shadow-lg/20 font-bold">
                    <div className="text-center">
                        War Number
                    </div>
                    <div>
                        Enemy Clan
                    </div>
                    <div>
                        Total Points
                    </div>
                    <div>
                        Participants
                    </div>
                    <div>
                        War Result
                    </div>
                    <div>
                        Action
                    </div>
                </div>
                {wars.map(war=>(
                    <WarRow key={war.war_id} war={war}/>
                ))}
            </div>
        </>
    )
}

export default WarsList;