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
        return <Navigate to={"/"} />
    } else {
        return <Outlet />
    }
}

export default ProtectLoginRegister;