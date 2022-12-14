import { FormEvent } from "react"
import { getProjectData } from "../GetProjectDataReq";
import { ProjectData } from "../ProjectData";
import { Notes } from "./NotesType";

const UploadNote = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const noteName: string = (document.getElementById("note-name-input-id") as HTMLInputElement).value;
    const noteBody: string = (document.getElementById("note-input-id") as HTMLInputElement).value;
    const queryParams: URLSearchParams = new URLSearchParams(window.location.search);
    const response: Response = await fetch(process.env.REACT_APP_API_CREATE_NOTES as string, {
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

    const projectData: ProjectData = await getProjectData() as ProjectData;
    const sizeOfNotes: number = projectData.notes.length -1;
    const lastNote: Notes = projectData.notes[sizeOfNotes];
    const notesContainer: HTMLElement = document.getElementById("project-view-notes-id") as HTMLElement;
    const newNoteElement: HTMLElement = document.createElement("div");
    const newNotesDataContainer: HTMLElement = document.createElement("div");
    const newNoteDateElement: HTMLElement = document.createElement("div");
    newNoteElement.id = `note ${sizeOfNotes}`;
    newNoteElement.className = "note-items-title";
    newNoteElement.innerHTML = lastNote.noteName;
    newNoteDateElement.innerHTML = lastNote.date.toLocaleString().substring(0,10);
    newNotesDataContainer.className = "new-note-row";
    newNoteDateElement.className = "new-note-date";
    notesContainer.appendChild(newNotesDataContainer);
    newNotesDataContainer.appendChild(newNoteElement);
    newNotesDataContainer.appendChild(newNoteDateElement);

    newNotesDataContainer.addEventListener("click", () => {
            
        const root: HTMLElement = document.getElementById("root") as HTMLElement;
        const app: HTMLElement = document.getElementById("App-id") as HTMLElement;

        const showNoteElement: HTMLElement = document.createElement("div");
        const showNoteElementTop: HTMLElement = document.createElement("div");
        const showNoteElementTitle: HTMLElement = document.createElement("h3");
        const showNoteElementClose: HTMLElement = document.createElement("h3");
        const showNoteElementText: HTMLElement = document.createElement("p");
        const showNoteElementDelete: HTMLElement = document.createElement("p");

        showNoteElement.className = "show-note-container";
        showNoteElementTop.className = "show-note-container-top";
        showNoteElementTitle.innerHTML = lastNote.noteName;
        showNoteElementTitle.className = "show-note-container-title";
        showNoteElementClose.className = "show-note-container-close";
        showNoteElementClose.innerHTML = "X";
        showNoteElementText.innerHTML = lastNote.note;
        showNoteElementDelete.className = "show-note-delete";
        showNoteElementDelete.innerHTML = "X";

        root.appendChild(showNoteElement);
        showNoteElement.appendChild(showNoteElementTop);
        showNoteElementTop.appendChild(showNoteElementTitle);
        showNoteElementTop.appendChild(showNoteElementClose);
        showNoteElement.appendChild(showNoteElementText);
        showNoteElement.appendChild(showNoteElementDelete);

        app.style.pointerEvents = "none";

        showNoteElementDelete.addEventListener("click", () => {
            const root: HTMLElement = document.getElementById("root") as HTMLElement;
            const deletePopUp: HTMLDivElement = document.createElement("div");
            const deleteTitle: HTMLHeadingElement = document.createElement("h3");
            const deleteOptions: HTMLDivElement = document.createElement("div");
            const deleteYes: HTMLButtonElement = document.createElement("button");
            const deleteNo: HTMLButtonElement = document.createElement("button");

            deletePopUp.className = "delete-element-container";
            deletePopUp.id = "delete-element-container-id";
            deleteTitle.className = "delete-element-heading";
            deleteOptions.className = "delete-element-options";
            deleteYes.className = "delete-element-yes";
            deleteNo.className = "delete-element-no";
            
            deleteTitle.innerHTML = "Are you sure you wish to delete?"
            deleteYes.innerHTML = "Yes";
            deleteNo.innerHTML = "No";

            root.appendChild(deletePopUp);
            deletePopUp.appendChild(deleteTitle);
            deletePopUp.appendChild(deleteOptions);
            deleteOptions.appendChild(deleteYes);
            deleteOptions.appendChild(deleteNo);

            deleteNo.addEventListener("click", () => {
                deletePopUp.remove();
            })

            deleteYes.addEventListener("click", async () => {
                try {
                const response: Response = await fetch(process.env.REACT_APP_API_DELETE_NOTES as string, {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
                    },
                    body: JSON.stringify(projectData.notes[sizeOfNotes].id),
                });
                const responseAwait: string = await response.text();
                newNotesDataContainer.remove();
                showNoteElement.remove();
                deletePopUp.remove();
                app.style.pointerEvents = "none";
                } catch (e) {
                }
            });
        });
        showNoteElementClose.addEventListener("click", () => {
            showNoteElement.remove();
            app.style.pointerEvents = "all";
        })
    })
}

export { UploadNote };