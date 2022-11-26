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
            nav("/login");
        } else {
            const emailInput: HTMLInputElement = document.getElementById("email-input-id") as HTMLInputElement;
            const passwordInput: HTMLInputElement = document.getElementById("pass-input-id") as HTMLInputElement;
            const RegisterErrorBox: HTMLDivElement = document.getElementById("register-error-box-id") as HTMLDivElement;

            emailInput.style.outline = "solid 2px red";        
            passwordInput.style.outline = "solid 2px red";

            RegisterErrorBox.classList.add("register-error-box-show");
        }
    } catch (e) {
        const emailInput: HTMLInputElement = document.getElementById("email-input-id") as HTMLInputElement;
        const passwordInput: HTMLInputElement = document.getElementById("pass-input-id") as HTMLInputElement;
        const RegisterErrorBox: HTMLDivElement = document.getElementById("register-error-box-id") as HTMLDivElement;

        emailInput.style.outline = "solid 2px red";
        passwordInput.style.outline = "solid 2px red";

        RegisterErrorBox.classList.add("register-error-box-show");
    }
}

export default registerUser;