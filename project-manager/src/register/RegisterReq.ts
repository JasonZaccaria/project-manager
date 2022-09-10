import { FormEvent } from "react";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { post } from "../requestShortcuts/RequestShortcut";
import { RegisterResponse } from "./RegisterRes";

const registerUser = async (url: string, e:FormEvent, nav: NavigateFunction): Promise<Object> => {
    e.preventDefault();
    const email: string = (document.getElementById("email-input-id") as HTMLInputElement).value
    const password: string = (document.getElementById("pass-input-id") as HTMLInputElement).value
    const readResponse: RegisterResponse = await post(url, { email: email, password: password }) as RegisterResponse;
    if (readResponse.success) {
        console.log(readResponse);
        nav("/login");
        return { success: "user account registered" };
    } else {
        console.log(readResponse);
        return { failure: "could not regsiter user" };
    }
}

export default registerUser;