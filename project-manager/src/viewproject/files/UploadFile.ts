import { FormEvent } from "react";
import { fileURLToPath } from "url";

const uploadFile = async (e: any) => {
    e.preventDefault();
    const fileData = new FormData();
    const getInput: HTMLInputElement = document.getElementById("file-input-id") as HTMLInputElement;
    const file: File = getInput.files?.item(0) as File;
    fileData.append("file", file);
    const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
    const id: string = searchParams.get("id") as string;
    const project: string = searchParams.get("project") as string;
    fileData.append("id", id);
    fileData.append("project", project);
    fileData.append("date", new Date().getTime().toString());
    const response = await fetch(process.env.REACT_APP_API_CREATE_FILES as string, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
        },
        body: fileData
    });
    const readResponse = await response.json();
}

export { uploadFile };