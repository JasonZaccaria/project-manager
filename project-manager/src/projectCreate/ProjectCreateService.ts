import { FormEvent } from "react";
import { ProjectCreateResponse } from "./ProjectCreateResponse";

const ProjectCreator = async (url: string, e: FormEvent) => {
    try {
        e.preventDefault();
        const projectName = (document.getElementById("project-name-input") as HTMLInputElement).value;
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
            },
            body: JSON.stringify({ projectName: projectName, creationDate: new Date().getTime() })
        })
        const readResponse: ProjectCreateResponse = await response.json();
        if (readResponse.id) {
            console.log("project successfully saved");
        } else {
            console.log("error saving project");
        }
    } catch (e) {
        console.log(e);
        console.log("error saving project");
    }
}

export { ProjectCreator };