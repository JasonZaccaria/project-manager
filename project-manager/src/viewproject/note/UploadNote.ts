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
    /*changes start here*/
    const newNotesDataContainer: HTMLElement = document.createElement("div");
    const newNoteDateElement: HTMLElement = document.createElement("div");
    /*changed end here*/
    newNoteElement.id = `note ${sizeOfNotes}`;
    newNoteElement.className = "note-items-title";
    newNoteElement.innerHTML = lastNote.noteName;
    newNoteDateElement.innerHTML = lastNote.date.toLocaleString().substring(0,10);
    newNotesDataContainer.className = "new-note-row";
    newNoteDateElement.className = "new-note-date";
    //notesContainer.appendChild(newNoteElement);
    notesContainer.appendChild(newNotesDataContainer);
    newNotesDataContainer.appendChild(newNoteElement);
    newNotesDataContainer.appendChild(newNoteDateElement);

    //changes start here!!! //was newnoteeleement
    newNotesDataContainer.addEventListener("click", () => {
            
        const root: HTMLElement = document.getElementById("root") as HTMLElement;
        const app: HTMLElement = document.getElementById("App-id") as HTMLElement;

        const showNoteElement: HTMLElement = document.createElement("div");
        const showNoteElementTop: HTMLElement = document.createElement("div");
        const showNoteElementTitle: HTMLElement = document.createElement("h3");
        const showNoteElementClose: HTMLElement = document.createElement("h3");
        const showNoteElementText: HTMLElement = document.createElement("p");

        showNoteElement.className = "show-note-container";
        showNoteElementTop.className = "show-note-container-top";
        showNoteElementTitle.innerHTML = lastNote.noteName;//notesArray[i].noteName;
        showNoteElementTitle.className = "show-note-container-title";
        showNoteElementClose.className = "show-note-container-close";
        showNoteElementClose.innerHTML = "X";
        showNoteElementText.innerHTML = lastNote.note;//notesArray[i].note;

        root.appendChild(showNoteElement);
        showNoteElement.appendChild(showNoteElementTop);
        showNoteElementTop.appendChild(showNoteElementTitle);
        showNoteElementTop.appendChild(showNoteElementClose);
        showNoteElement.appendChild(showNoteElementText);

        app.style.pointerEvents = "none";

        showNoteElementClose.addEventListener("click", () => {
            showNoteElement.remove();
            app.style.pointerEvents = "all";
        })

    })
    //changes end here


}

export { UploadNote };