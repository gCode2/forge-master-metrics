import { useContext } from "react";
import {AuthContext} from "../features/auth/AuthProvider";

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error ("useAuthmust be used inside AuthProvider");
    }
    return context;
}