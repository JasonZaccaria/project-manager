import { FormEvent } from "react"
import { Notes } from "../../getproject/ProjectTypes";

const UploadNote = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const noteName: string = (document.getElementById("note-name-input-id") as HTMLInputElement).value;
    const noteBody: string = (document.getElementById("note-input-id") as HTMLInputElement).value;
    const queryParams: URLSearchParams = new URLSearchParams(window.location.search);
    const response: Response = await fetch("http://localhost:8080/api/notes/create", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
        },
        body: JSON.stringify({projectId: queryParams.get("id"), projectName: queryParams.get("project"), noteName: noteName, note: noteBody, date: new Date().getTime()})//JSON.stringify(noteReq)
        
    })

    const readResponse = await response.json();
    console.log(readResponse);
}

export { UploadNote };