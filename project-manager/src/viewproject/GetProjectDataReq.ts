import { Type } from "typescript";
import { ProjectData } from "./ProjectData";

const getProjectData = async (): Promise<ProjectData | Object> => {
    try {
        const params = new URLSearchParams(window.location.search);
        const project = params.get("project");
        const projectId = Number.parseInt(params.get("id") as string);
        console.log(window.location.search);
        console.log("project");
        console.log("id");
    
        const response: Response = await fetch("http://localhost:8080/api/viewproject", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
            },
            body: JSON.stringify({ projectId: projectId, projectName: project })
        })
        const readResponse: ProjectData = await response.json();
        console.log(readResponse);
        //changes here adding ot localstorage 10/17/2022
        window.localStorage.setItem("projectData", JSON.stringify(readResponse));
        //changes end here
        return readResponse;
    } catch (e) {
        console.log(e);
        return { failure: "could not get projects from server" };
    }
}

export { getProjectData };