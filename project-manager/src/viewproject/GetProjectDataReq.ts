import { Type } from "typescript";
import { ProjectData } from "./ProjectData";

const getProjectData = async (): Promise<ProjectData | Object> => {
    try {
        const params = new URLSearchParams(window.location.search);
        const project = params.get("project");
        const projectId = params.get("id");
    
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
        return readResponse;
    } catch (e) {
        console.log(e);
        return { failure: "could not get projects from server" };
    }
}

export { getProjectData };