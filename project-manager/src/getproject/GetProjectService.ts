import { FormEvent } from "react";
import { projectResponse } from "./ProjectTypes";
import { GetProjectResponse } from "./GetProjectResponse";
import { NavigateFunction, useNavigate } from "react-router-dom";

const projectNavigator = (projectButton: HTMLButtonElement, nav: NavigateFunction) => {
    const projectId = projectButton.parentElement!.id;
    const projectTitle = projectButton.parentElement!.firstElementChild!.innerHTML;
    const searchParams = new URLSearchParams();
    searchParams.append("project", projectTitle);
    searchParams.append("id", projectId);
    nav(`/projectpage/?${searchParams.toString()}`)
    
}

const projectRender = async (url: string, getProjectFunc: Function, navigateProjectFunc: Function, nav: NavigateFunction) => {
    const getProjectResponse: GetProjectResponse = await getProjectFunc(url);
    const projectArea = document.getElementById("project-area-id");
    for (let i = 0; i < getProjectResponse.projects.length; i++) {

        const projectCard = document.createElement("div");
        const projectTitle = document.createElement("h3");
        const projectDate = document.createElement("p")
        const projectButton = document.createElement("button")

        projectCard.id = getProjectResponse.projects[i].id!.toString();
        projectTitle.innerHTML = getProjectResponse.projects[i].projectName!;
        projectDate.innerHTML = getProjectResponse.projects[i].creationDate!.toLocaleString();
        projectButton.innerHTML = "open project";

        projectArea?.appendChild(projectCard);
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDate);
        projectCard.appendChild(projectButton);

        projectButton.addEventListener("click", () => navigateProjectFunc(projectButton, nav));
    }
}


const GetProjects = async (url: string): Promise<GetProjectResponse | null> => {
    try {
        const response: Response = await fetch(url, {
            method: "GET", 
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
            }
        })
        const readResponse: GetProjectResponse = await response.json();
        console.log(readResponse);
        window.localStorage.setItem("projects", JSON.stringify(readResponse));
        return readResponse;
    } catch (e) {
        console.log(e);
        return null;
   }
}

export { GetProjects, projectRender, projectNavigator};