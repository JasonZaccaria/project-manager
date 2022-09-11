import { useState, useEffect } from "react";
import { getWithJwt } from "../requestShortcuts/RequestShortcut";
import { ProtectedResponseType } from "./protectedResponseType";
import { Navigate, Outlet } from "react-router-dom";
const ProtectLoginRegister = () => {

    let [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        const testAuth = async () => {
            if (window.localStorage.getItem("jwt") != null) {
                const readResponse: ProtectedResponseType = await getWithJwt("http://localhost:8080/api/testlogin");
                console.log(readResponse);
                if (readResponse.success) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } else {
                setLoggedIn(false);
            }
        }
        testAuth();
    })
    if (loggedIn) {
        console.log(loggedIn);
        return <Navigate to={"/"} />
    } else {
        console.log(loggedIn);
        return <Outlet />
    }
}

export default ProtectLoginRegister;