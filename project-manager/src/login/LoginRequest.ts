import { FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import { LoginResponse } from "./LoginResponse";

const loginUser = async (url: string, e:FormEvent, nav: NavigateFunction): Promise<void | Object>  => {
    e.preventDefault();
    const email: string = (document.getElementById("login-email-input-id") as HTMLInputElement).value;
    const password: string = (document.getElementById("login-pass-input-id") as HTMLInputElement).value;
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password })
        })
        const readResponse: LoginResponse = await response.json();
        if (readResponse.jwt) {
            console.log(readResponse);
            window.localStorage.setItem("jwt", readResponse.jwt);
            nav("/");
        } else {
            console.log("could not retrieve user")
            //i could perform other logic down here
        }
    } catch (e) {
        console.log(e);
        console.log("error coudl not login user");
        //perform error logic down here
    }
}

export default loginUser;