import { useState } from "react";
import { Link } from "react-router";

function RegisterPage(){
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        const validationErrors = validateInputs();
        const hasErrors = Object.values(validationErrors).some(error => error!== "");

        if(hasErrors){
            setErrors(validationErrors);
        }else{
            const data = {
                username: inputs.username,
                password: inputs.password
            }
            setErrors({
                username: "",
                password: "",
                confirmPassword: ""
            });
            setInputs({
                username: "",
                password: "",
                confirmPassword: ""
            });
            
            // save data to database (auth)
        }

    }
    function validateInputs(){
        const newErrors = {
            username: "",
            password: "",
            confirmPassword: ""
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;

        if (!inputs.username.trim()) {
            newErrors.username = "Username is required";
        }else if(inputs.username.length < 3){
            newErrors.username = "Username is too short (min 3 characters)";
        }else if (inputs.username.length > 20) {
            newErrors.username = "Username is too long (max 20 characters)";
        } else if (!usernameRegex.test(inputs.username)) {
            newErrors.username = "Username has invalid characters";
        }
        if (!inputs.password.trim()) {
            newErrors.password = "Password is required";
        } else if (inputs.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (inputs.password.length > 20) {
            newErrors.password = "Password is too long (max 20 characters)";
        }
        if(!inputs.confirmPassword.trim()){
            newErrors.confirmPassword = "Confirm password";
        }else if(inputs.password !== inputs.confirmPassword){
            newErrors.confirmPassword = "Passwords don't match";
        }
        return newErrors;
    }

    return (
        <>
            <form className="flex flex-col justify-center items-center h-screen" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-center border-2 p-8 rounded">
                    {/* dont forget to include mobile in the styles */}
                    <div className="font-black text-3xl mb-3">
                        Register
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={inputs.username} id="username" className="bg-zinc-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-1 shadow-xs placeholder:text-body rounded" placeholder="Jane Doe" required onChange={handleChange}/>
                        {/* karuzela nickname'ow z klanu */}
                        <span className="text-red-500 text-xs text-left w-full min-h-[1rem]">
                            {errors.username ? errors.username : ""}
                        </span>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={inputs.password} id="password" className="bg-zinc-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-1 shadow-xs placeholder:text-body rounded" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required onChange={handleChange}/>
                        <span className="text-red-500 text-xs text-left w-full min-h-[1rem]">
                            {errors.password ? errors.password : ""}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 w-full">
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input type="password" name="confirmPassword" value={inputs.confirmPassword} id="confirm-password" className="bg-zinc-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-1 shadow-xs placeholder:text-body rounded" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required onChange={handleChange}/>
                        <span className="text-red-500 text-xs text-left w-full min-h-[1rem]">
                            {errors.confirmPassword ? errors.confirmPassword : ""}
                        </span>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-2 w-full py-2">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black">
                        Register
                    </button>
                    <button type="button" className="bg-zinc-400 hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black">
                        Cancel
                    </button>
                    </div>
                    <div className="pt-2">
                        Already have an account? <Link className="text-blue-500" to="/login">Log in here</Link>
                    </div>
                </div>
            </form>
        </>
    )
}
export default RegisterPage;