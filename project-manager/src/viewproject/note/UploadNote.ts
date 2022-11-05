import { FormEvent } from "react"
import { getProjectData } from "../GetProjectDataReq";
import { ProjectData } from "../ProjectData";
import { Notes } from "./NotesType";

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

    const projectData: ProjectData = await getProjectData() as ProjectData;
    const sizeOfNotes: number = projectData.notes.length -1;
    const lastNote: Notes = projectData.notes[sizeOfNotes];
    console.log(projectData);
    console.log(projectData.notes);
    console.log(projectData.notes.length);
    const notesContainer: HTMLElement = document.getElementById("project-view-notes-id") as HTMLElement;
    const newNoteElement: HTMLElement = document.createElement("div");
    newNoteElement.id = `note ${sizeOfNotes}`;
    newNoteElement.className = "note-items-title";
    newNoteElement.innerHTML = lastNote.noteName;
    notesContainer.appendChild(newNoteElement);
}

export { UploadNote };