import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import verifyLogin from "./VerifyLoginFunc";

const ProtectProjects = () => {
    let [loggedIn, setLoggedIn] = useState(true);
    useEffect(() => {
        verifyLogin(setLoggedIn);
    })
    console.log(loggedIn);
    if (loggedIn) {
        console.log(loggedIn);
        return <Outlet />
    } else {
        console.log(loggedIn);
        return <Navigate to={"/"} />
    }
}

export default ProtectProjects;