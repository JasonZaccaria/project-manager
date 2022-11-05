import { FormEvent } from "react";
import { fileURLToPath } from "url";

const uploadFile = async (e: any) => {
    e.preventDefault();
    const fileData = new FormData();
    const getInput: HTMLInputElement = document.getElementById("file-input-id") as HTMLInputElement;
    const file: File = getInput.files?.item(0) as File;
    console.log(file);
    fileData.append("file", file);
    const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
    const id: string = searchParams.get("id") as string;
    const project: string = searchParams.get("project") as string;
    fileData.append("id", id);
    fileData.append("project", project);
    fileData.append("date", new Date().getTime().toString());
    console.log(fileData.getAll("file"));
    const response = await fetch("http://localhost:8080/api/files/create", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            //"Content-Type": "multipart/form-data",
            //"Content-Type": "undefined",
            "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
        },
        body: fileData
    });
    const readResponse = await response.json();
    console.log(readResponse);
}

export { uploadFile };