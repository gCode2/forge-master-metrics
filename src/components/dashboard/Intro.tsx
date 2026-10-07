import type { IntroProps } from "../../types/types";

function Intro({understoodHandler} : IntroProps){
    return (
    <>
    <div className="flex flex-col gap-2">
        <div>
                        Before we proceed, we need to verify your in-game identity
                    </div>
                    <div>
                        You will be presented with a list of players, from which you need to find your nickname and tap <span className="text-green-500">"claim"</span> in order to get full access to this app.
                    </div>
                    <div>
                        <button
                        type="button"
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black text-sm"
                        onClick={understoodHandler}
                    >
                        I understand
                    </button>
                    </div>
    </div>
    </>
    );
}
export default Intro;