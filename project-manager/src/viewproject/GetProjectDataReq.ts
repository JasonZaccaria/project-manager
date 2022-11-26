import { ProjectData } from "./ProjectData";

const getProjectData = async (): Promise<ProjectData | Object> => {
    try {
        const params = new URLSearchParams(window.location.search);
        const project = params.get("project");
        const projectId = Number.parseInt(params.get("id") as string);
        const response: Response = await fetch(process.env.REACT_APP_API_VIEW_PROJECT as string, {
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
        window.localStorage.setItem("projectData", JSON.stringify(readResponse));
        return readResponse;
    } catch (e) {
        return { failure: "could not get projects from server" };
    }
}

export { getProjectData };