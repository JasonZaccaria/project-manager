import { FormEvent } from "react";

import { post } from "./RequestShortcut";

 

const auth = () => {

 

}

 

const loginUser = async (url: string, e:FormEvent)  => {

    e.preventDefault();

    const email: string = (document.getElementById("login-email-input-id") as HTMLInputElement).value;

    const password: string = (document.getElementById("login-pass-input-id") as HTMLInputElement).value;

    const readResponse = await post(url, {email: email, password: password});

    if (Object.keys(readResponse)[0] === "success") {

        //continue logic down here

    }

   

}

 

const registerUser = async (url: string, e:FormEvent): Promise<void> => {

    e.preventDefault();

    const email: string = (document.getElementById("email-input-id") as HTMLInputElement).value

    const password: string = (document.getElementById("pass-input-id") as HTMLInputElement).value

    const readResponse = await post(url, {email: email, password: password});

    if (Object.keys(readResponse)[0] === "success") {

        //continue logic down here

    }

}

 

export {auth, loginUser, registerUser};