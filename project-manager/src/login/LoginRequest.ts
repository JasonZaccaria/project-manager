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
            window.localStorage.setItem("jwt", readResponse.jwt);
            nav("/");
        } else {
            const emailInput: HTMLInputElement = document.getElementById("login-email-input-id") as HTMLInputElement;
            const passwordInput: HTMLInputElement = document.getElementById("login-pass-input-id") as HTMLInputElement;
            const loginErrorBox: HTMLDivElement = document.getElementById("login-error-box-id") as HTMLDivElement;

            emailInput.style.outline = "solid 2px red";        
            passwordInput.style.outline = "solid 2px red";

            loginErrorBox.classList.add("login-error-box-show");
        }
    } catch (e) {
        const emailInput: HTMLInputElement = document.getElementById("login-email-input-id") as HTMLInputElement;
        const passwordInput: HTMLInputElement = document.getElementById("login-pass-input-id") as HTMLInputElement;
        const loginErrorBox: HTMLDivElement = document.getElementById("login-error-box-id") as HTMLDivElement;

        emailInput.style.outline = "solid 2px red";
        passwordInput.style.outline = "solid 2px red";

        loginErrorBox.classList.add("login-error-box-show");

    }
}

export default loginUser;