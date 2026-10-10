import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateInputs();
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    try{
        const username = inputs.username.trim().toLowerCase();
        const email = `${username}@polskapl.pl`;
        const {error} = await supabase.auth.signInWithPassword({
            email: email,
            password: inputs.password
        });
        if(error){
            console.error("Login error:", error);
            setErrors({
                username: error.message,
                password: ""
            })
            return;
        }
        
        setErrors({
            username: "",
            password: "",
        });
        setInputs({
            username: "",
            password: "",
        });
        navigate("/dashboard")
    }finally{
        setLoading(false);
    }
    

    
  }

  function validateInputs() {
    const newErrors = {
      username: "",
      password: "",
    };
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!inputs.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!usernameRegex.test(inputs.username)) {
      newErrors.username = "Username has invalid characters";
    }

    if (!inputs.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  }

  return (
    <>
      <form
        className="flex flex-col justify-center items-center h-screen w-screen"
        onSubmit={handleSubmit}
      >
        <div className="relative flex flex-col justify-center items-center border-2 py-5 px-14 rounded">
          <fieldset
            disabled={loading}
            className={`${
              loading ? "blur-[10px]" : ""
            } flex flex-col justify-center items-center`}
          >
            {/* dont forget to include mobile in the styles */}
            <div className="font-black text-3xl mb-3">Log in</div>

            <div className="flex flex-col justify-center items-center gap-1 w-full">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={inputs.username}
                id="username"
                className="bg-zinc-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-1 shadow-xs placeholder:text-body rounded"
                placeholder="john_doe"
                required
                onChange={handleChange}
              />
              {/* karuzela nickname'ow z klanu */}
              <span className="text-red-500 text-xs text-left w-full min-h-[1rem]">
                {errors.username ?? ""}
              </span>
            </div>

            <div className="flex flex-col justify-center items-center gap-1 w-full">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                id="password"
                className="bg-zinc-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-1 shadow-xs placeholder:text-body rounded"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
                onChange={handleChange}
              />
              <span className="text-red-500 text-xs text-left w-full min-h-[1rem]">
                {errors.password ?? ""}
              </span>
            </div>

            <div className="flex flex-row justify-center items-center gap-2 w-full py-2">
              <button
                type="submit"
                className="flex flex-row justify-center items-center bg-blue-500 enabled:hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 enabled:hover:border-blue-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black w-20"
              >
                Login
              </button>
              <button
                type="button"
                className="flex flex-row justify-center items-center bg-zinc-400 enabled:hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 enabled:hover:border-zinc-500 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black w-20"
              >
                Home
              </button>
            </div>
            <div className="pt-2">
              Dont have an account yet?{" "}
              <Link
                className="text-blue-500"
                to="/register"
                aria-disabled={loading}
                onClick={(e) => {
                  if (loading) e.preventDefault();
                }}
              >
                Sign up
              </Link>
            </div>
          </fieldset>
          {loading && (
            <div
              role="status"
              className="absolute flex flex-col justify-center items-center gap-1"
            >
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-neutral-tertiary animate-spin fill-brand"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#cccccc"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#2b7fff"
                />
              </svg>
              <span className="sr-only">Loading...</span>
              <span>Logging in...</span>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
export default LoginPage;
