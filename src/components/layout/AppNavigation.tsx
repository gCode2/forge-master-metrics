import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router";

function AppNavigation (){
    const {user} = useAuth();
    const [isMenuOpened, setMenuOpened] = useState(false);
    const navigate = useNavigate();
    
    function handleLogout(){
        supabase.auth.signOut();
        navigate("/login");
    }
    return (
        <>
            <div className="flex flex-row gap-3 items-center">
                <div className="flex flex-col justify-center md:hidden">
                    <button onClick={
                    ()=>setMenuOpened(!isMenuOpened)
                    }>
                        <IoMenu className="text-4xl"/>
                    </button>
                </div>
                    <Link to={user ? "/dashboard" : "/"}
                    type="button"
                    className="flex flex-row justify-center items-center bg-zinc-400 hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black"
                    >
                    Home
                    </Link>
                    {user && (
                        <>
                            <Link to="/players"
                                type="button"
                                className="flex flex-row justify-center items-center bg-zinc-400 hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black"
                                >
                                Players
                            </Link>
                            <Link to="/wars"
                                type="button"
                                className="flex flex-row justify-center items-center bg-zinc-400 hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black"
                                >
                                Wars
                            </Link>
                            <Link to="/charts"
                                type="button"
                                className="flex flex-row justify-center items-center bg-zinc-400 hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black"
                                >
                                Charts
                            </Link>
                            <Link to="/calculators"
                                type="button"
                                className="flex flex-row justify-center items-center bg-zinc-400 hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black"
                                >
                                Calculators
                            </Link>
                            <button className="flex flex-row justify-center items-center bg-zinc-400 enabled:hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 enabled:hover:border-zinc-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    )}
                    
                {!user && (
                    <>
                        <Link to="/login" className="flex flex-row justify-center items-center bg-zinc-400 enabled:hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 enabled:hover:border-zinc-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black">
                                Log in
                        </Link>
                        <Link to="/register" className="flex flex-row justify-center items-center bg-zinc-400 enabled:hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 enabled:hover:border-zinc-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black">
                                Sign up
                        </Link>
                    </>
                )}
                
            </div>
        </>
    )
}
export default AppNavigation;