import { useParams } from "react-router";

function PlayerPage(){
    const {id} = useParams();
    return (
        <>
            <div>
                Player Page {id}
            </div>
        </>
    )
}
export default PlayerPage;