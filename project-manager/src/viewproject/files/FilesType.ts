interface Files {
    id: number,
    projectId: number,
    projectName: string,
    fileName: string,
    file: string,
    fileUploadDate: Date,
    fileLocation?: string
}

export type { Files };