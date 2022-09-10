/*Below are shortcuts for fetch requests*/

import { RegisterResponse } from "../register/RegisterRes";

const get = async (url: string) => {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const readResponse = await response.json();
    return readResponse;
} 

const getWithJwt = async (url: string) => {
    const response: Response = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("jwt") as string
        }
    })
    const readResponse = await response.json();
    return readResponse;
}

const post = async (url: string, postObject: Object): Promise<Object> => {
    try {
        const response: Response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObject)
        })
        const readResponse: Object = await response.json();
        return readResponse;
    } catch (e) {
        console.log(e);
        return { success: false };
    }
}

const postWithJwt = async (url: string, postObject: Object): Promise<Object> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": window.localStorage.getItem("jwt") as string
            },
            body: JSON.stringify(postObject)
        })
        const readResponse = await response.json();
        return readResponse;
    } catch (e) {
        console.log(e);
        return { success: true };
    }
}

export { post, get, postWithJwt, getWithJwt };