import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import verifyLogin from "./VerifyLoginFunc";

const ProtectProjects = () => {
    let [loggedIn, setLoggedIn] = useState(true);
    useEffect(() => {
        verifyLogin(setLoggedIn);
    })
    if (loggedIn) {
        return <Outlet />
    } else {
        return <Navigate to={"/"} />
    }
}

export default ProtectProjects;