import { FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import { post } from "../requestShortcuts/RequestShortcut";
import { LoginResponse } from "./LoginResponse";

const loginUser = async (url: string, e:FormEvent, nav: NavigateFunction): Promise<void | Object>  => {
    e.preventDefault();
    const email: string = (document.getElementById("login-email-input-id") as HTMLInputElement).value;
    const password: string = (document.getElementById("login-pass-input-id") as HTMLInputElement).value;
    const readResponse: LoginResponse = await post(url, {email: email, password: password});
    if (readResponse.jwt) {
        console.log(readResponse);
        window.localStorage.setItem("jwt", readResponse.jwt);
        return nav("/");
    }
    console.log(readResponse);
    return { failure: "could not authentication user" };
}

export default loginUser;