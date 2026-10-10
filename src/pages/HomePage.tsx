import { Link } from "react-router";

function HomePage(){
    return (
        <>
            <div className="flex flex-col w-screen h-screen justify-center items-center relative">
                <div className="flex items-center justify-center relative w-52 h-36">
                <div className="carousel-image carousel-image-1">
                    <img
                        className="w-full h-full object-cover"
                        src="/favicon.png"
                        alt="Forge Master icon"
                    />
                </div>
                <div className="carousel-image carousel-image-2">
                    <img
                        className="w-full h-full object-contain"
                        src="/fm-2.png"
                        alt="Forge Master logo"
                    />
                </div>
            </div>
                <div className="flex w-125 flex-col justify-center items-center text-center gap-4 relative z-100 backdrop-blur-xs">
                    <div className="text-5xl font-bold">
                        Forge Master Metrics
                    </div>
                    <div>
                       An analytics dashboard for Forge Master tracking player performance, clan war outcomes, weekly metrics, and interactive charts 
                    </div>
                    <div className="flex flex-row w-full justify-center items-center gap-5">
                        <Link to="/login"
                            type="button"
                            className="flex flex-row justify-center items-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black w-25"
                        >
                            Log in
                        </Link>
                        <Link to="/register"
                            type="button"
                            className="flex flex-row justify-center items-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black w-25"
                        >
                            Sign up
                        </Link>
                    </div>
                    <div className="text-xs text-zinc-300">
                       Exclusively made for [PLPL] POLSKAPL Clan
                    </div>
                </div>
                
            </div>

        </>
    )

}
export default HomePage;