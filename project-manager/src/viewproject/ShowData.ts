import { Notes } from "./note/NotesType";
import { ProjectData } from "./ProjectData";

const showNotes = async (): Promise<void> => {
    const viewNotesContainer: HTMLElement = document.getElementById("project-view-notes-id") as HTMLElement;
    const projectData: ProjectData = JSON.parse(window.localStorage.getItem("projectData") as string);
    console.log(projectData);
    const notesArray: Notes[] = projectData.notes;
    console.log(notesArray);
    for (let i = 0; i < notesArray.length; i++) {
        const newNote: HTMLElement = document.createElement("div");
        newNote.className = "note-items-title";
        newNote.id = `note ${i}`;
        newNote.innerHTML = notesArray[i].noteName;
        viewNotesContainer.appendChild(newNote);
        //changes start here to addd a new opening note box to display the note asynchronously on screen!!!
        newNote.addEventListener("click", () => {
            
            const root: HTMLElement = document.getElementById("root") as HTMLElement;
            const app: HTMLElement = document.getElementById("App-id") as HTMLElement;

            const showNoteElement: HTMLElement = document.createElement("div");
            const showNoteElementTop: HTMLElement = document.createElement("div");
            const showNoteElementTitle: HTMLElement = document.createElement("h3");
            const showNoteElementClose: HTMLElement = document.createElement("h3");
            const showNoteElementText: HTMLElement = document.createElement("p");

            showNoteElement.className = "show-note-container";
            showNoteElementTop.className = "show-note-container-top";
            showNoteElementTitle.innerHTML = notesArray[i].noteName;
            showNoteElementTitle.className = "show-note-container-title";
            showNoteElementClose.className = "show-note-container-close";
            showNoteElementClose.innerHTML = "X";
            showNoteElementText.innerHTML = notesArray[i].note;

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
}

const showFiles = async (): Promise<void> => {

}
//actually we don't need this bottom function for now
const showDeadlines = (): void => {

}

export { showNotes, showFiles };