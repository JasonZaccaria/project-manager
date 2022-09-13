interface GetProjectResponse {
    projects: Project[]
}

interface Project {
    id?: number,
    projectName?: string,
    creationDate?: Date,
    owner?: string,
}

export type { GetProjectResponse, Project };