import { FormEvent } from "react";
import { projectResponse } from "./ProjectTypes";
import { GetProjectResponse, Project } from "./GetProjectResponse";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ProjectCreator } from "../projectCreate/ProjectCreateService";
import { ProjectCreateResponse } from "../projectCreate/ProjectCreateResponse";
import { getAllJSDocTagsOfKind } from "typescript";

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

        const projectCard: HTMLDivElement = document.createElement("div");
        const projectCardTop: HTMLDivElement = document.createElement("div");
        const projectTitle: HTMLHeadElement = document.createElement("h3");
        const projectDate: HTMLParagraphElement = document.createElement("p")
        const projectButton: HTMLButtonElement = document.createElement("button")

        projectCard.className = "project-cards";
        projectCard.id = getProjectResponse.projects[i].id!.toString();
        projectCardTop.className = "project-card-top";
        projectTitle.innerHTML = getProjectResponse.projects[i].projectName!;
        projectTitle.className = "project-card-title";
        projectDate.innerHTML = getProjectResponse.projects[i].creationDate!.toLocaleString().substring(0,10);
        projectButton.className = "project-card-button";
        projectButton.innerHTML = "open project";

        projectArea?.appendChild(projectCard);
        projectCard.appendChild(projectCardTop);
        projectCardTop.appendChild(projectTitle);
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


const createProject = (e: FormEvent) => {
    e.preventDefault();
    const app: HTMLElement = document.getElementById("App-id") as HTMLElement;
    const root: HTMLElement = document.getElementById("root") as HTMLElement;

    const createProjectContainer: HTMLElement = document.createElement("div");
    const createProjectTop: HTMLElement = document.createElement("div");
    const createProjectTitle: HTMLElement = document.createElement("h3");
    const createProjectClose: HTMLElement = document.createElement("h3");
    const createProjectForm: HTMLFormElement = document.createElement("form");
    const createProjectInput: HTMLInputElement = document.createElement("input");
    const createProjectButton: HTMLButtonElement = document.createElement("button");

    createProjectContainer.className = "create-project-container";
    createProjectTop.className = "create-project-top";
    createProjectTitle.className = "create-project-title";
    createProjectClose.className = "create-project-close";
    createProjectForm.className = "create-project-form";
    createProjectInput.className = "create-project-input";
    createProjectButton.className = "create-project-button";

    createProjectTitle.innerHTML = "Create A New Project";
    createProjectClose.innerHTML = "X";
    createProjectButton.innerHTML = "Create";
    createProjectInput.placeholder = "Project Name";
    createProjectInput.id = "project-name-input";

    root.appendChild(createProjectContainer);
    createProjectContainer.appendChild(createProjectTop);
    createProjectTop.appendChild(createProjectTitle);
    createProjectTop.appendChild(createProjectClose);
    createProjectContainer.appendChild(createProjectForm);
    createProjectForm.appendChild(createProjectInput);
    createProjectForm.appendChild(createProjectButton);

    app.style.pointerEvents = "none";

    createProjectClose.addEventListener("click", () => {
        createProjectContainer.remove();
        app.style.pointerEvents = "all";
    })

    createProjectForm.addEventListener("submit", async (e: SubmitEvent) => {
        try {
            const projectReponse: ProjectCreateResponse = await ProjectCreator("http://localhost:8080/api/createproject", e) as ProjectCreateResponse;
            const getProjectResponse: GetProjectResponse = await GetProjects("http://localhost:8080/api/projects") as GetProjectResponse;
            const projectArea = document.getElementById("project-area-id");
            const projectArray: Project[] = getProjectResponse.projects;
            const projectArrayLength: number = projectArray.length;
            const currentProject: Project = projectArray[projectArrayLength -1];

                const projectCard = document.createElement("div");
                const projectCardTop = document.createElement("div");
                const projectTitle = document.createElement("h3");
                const projectDate = document.createElement("p")
                const projectButton = document.createElement("button")

                projectCard.className = "project-cards";
                projectCard.id = currentProject.id!.toString();
                projectCardTop.className = "project-card-top";
                projectTitle.innerHTML = currentProject.projectName!;
                projectDate.innerHTML = currentProject.creationDate!.toLocaleString().substring(0,10);
                projectButton.className = "project-card-button";
                projectButton.innerHTML = "open project";

                projectArea?.appendChild(projectCard);
                projectCard.appendChild(projectCardTop);
                projectCardTop.appendChild(projectTitle);
                projectCard.appendChild(projectDate);
                projectCard.appendChild(projectButton);

                createProjectContainer.remove();
                app.style.pointerEvents = "all";

                //projectButton.addEventListener("click", () => navigateProjectFunc(projectButton, nav));
                projectButton.addEventListener("click", () => {
                    //window.history.pushState( "title","title", "http://localhost:3000/calendar");
                    window.location.replace(`/projectpage/?project=${currentProject.projectName}&id=${currentProject.id}`);
                    //window.location.pathname = "/calendar";
                    //window.location.reload();
                    
                })


        } catch (exception) {
            console.log("COULD NOT LOAD PROJECT");
        }
        
    })

    //below start adding logic to stop poniter actions on app and then delte objects on click of x button
}

export { GetProjects, projectRender, projectNavigator, createProject};