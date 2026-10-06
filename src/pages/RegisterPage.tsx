import { Link } from "react-router";

function RegisterPage(){
    return (
        <>
            <form className="flex flex-col justify-center items-center h-screen">
                <div className="flex flex-col w-1/4 justify-center items-center gap-2 border-1 p-10 rounded">
                    <div className="font-black text-3xl">
                        Register
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="bg-zinc-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-1 shadow-xs placeholder:text-body rounded" placeholder="Jane Doe" required />
                        {/* karuzela nickname'ow z klanu */}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="bg-zinc-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-1 shadow-xs placeholder:text-body rounded" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input type="password" id="confirm-password" className="bg-zinc-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-1 shadow-xs placeholder:text-body rounded" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required />
                    </div>
                    <div className="flex flex-row justify-center items-center gap-2 w-full">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 transition duration-200 hover:cursor-pointer rounded">
                            Register
                        </button>
                        <button type="button" className="bg-zinc-400 hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 transition duration-200 hover:cursor-pointer rounded">
                            Cancel
                        </button>
                    </div>
                    <div>
                        Already have an account? <Link className="text-blue-500" to="/login">Log in here</Link>
                    </div>
                </div>
            </form>
        </>
    )
}
export default RegisterPage;