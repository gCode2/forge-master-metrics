import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

function AppNavigation (){
    const [isMenuOpened, setMenuOpened] = useState(false);
    function handleMenuOpen(){
        setMenuOpened(true)
        console.log('xd')
    }
    return (
        <>
        <div className="flex flex-row gap-3">
            <div className="flex flex-col justify-center">
                <button onClick={handleMenuOpen}>
                    <IoMenu className="text-4xl"/>
                </button>
            </div>
            <div className="border-2 p-2 rounded-lg font-bold">
                Profile
            </div>
            <div className="border-2 p-2 rounded-lg font-bold">
                Dashboard
            </div>
            <div className="border-2 p-2 rounded-lg font-bold">
                Players
            </div>
            <div className="border-2 p-2 rounded-lg font-bold">
                Wars
            </div>
            <div className="border-2 p-2 rounded-lg font-bold">
                Charts
            </div>
            <div className="border-2 p-2 rounded-lg font-bold">
                Calculators
            </div>
            <div className="border-2 p-2 rounded-lg font-bold">
                Log in
            </div>
            <div className="border-2 p-2 rounded-lg font-bold">
                Log out
            </div>
            
        </div>
            
            {/* <FaArrowLeft className="text-2xl"/> */}
        </>
    )
}
export default AppNavigation;