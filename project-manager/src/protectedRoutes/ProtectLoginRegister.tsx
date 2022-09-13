import { useState, useEffect } from "react";
import { ProtectedResponseType } from "./protectedResponseType";
import { Navigate, Outlet } from "react-router-dom";
import verifyLogin from "./VerifyLoginFunc";
const ProtectLoginRegister = () => {

    let [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        verifyLogin(setLoggedIn);
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