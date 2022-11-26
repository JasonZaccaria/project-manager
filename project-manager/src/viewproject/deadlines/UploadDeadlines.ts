import { FormEvent } from "react"

const UploadDeadlines = async (url: string, e: FormEvent): Promise<void> => {
    e.preventDefault();
    const deadlineNote: string = (document.getElementById("deadlines-note-input-id") as HTMLInputElement).value;
    const deadlineBody: string = (document.getElementById("deadlines-input-id") as HTMLInputElement).value;
    const newDeadline = new Date(deadlineBody).getTime();
    const queryParmas: URLSearchParams = new URLSearchParams(window.location.search);
    const response: Response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
        },
        body: JSON.stringify({projectId: queryParmas.get("id"), projectName: queryParmas.get("project"), deadlineNote: deadlineNote, deadlineDate: newDeadline})
    })

    const readResponse: any = await response.json();
}

export { UploadDeadlines };