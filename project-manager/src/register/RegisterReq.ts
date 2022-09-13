import { FormEvent } from "react";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { RegisterResponse } from "./RegisterRes";

const registerUser = async (url: string, e:FormEvent, nav: NavigateFunction): Promise<void> => {
    e.preventDefault();
    const email: string = (document.getElementById("email-input-id") as HTMLInputElement).value
    const password: string = (document.getElementById("pass-input-id") as HTMLInputElement).value
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
        const readResponse: RegisterResponse = await response.json();
        if (readResponse.success) {
            console.log(readResponse);
            nav("/login");
        } else {
            console.log("failure could not register user");
        }
    } catch (e) {
        console.log(e);
        console.log("could not regsiter user error");
        //perform some other error handling here
    }
}

export default registerUser;