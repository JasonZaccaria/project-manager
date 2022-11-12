import { Files } from "./files/FilesType";
import { Notes } from "./note/NotesType";
import { ProjectData } from "./ProjectData";

const showNotes = async (): Promise<void> => {
    const viewNotesContainer: HTMLElement = document.getElementById("project-view-notes-id") as HTMLElement;
    const projectData: ProjectData = JSON.parse(window.localStorage.getItem("projectData") as string);
    console.log(projectData);
    const notesArray: Notes[] = projectData.notes;
    console.log(notesArray);
    for (let i = 0; i < notesArray.length; i++) {
        const newNoteRow: HTMLElement = document.createElement("div");
        const newNote: HTMLElement = document.createElement("div");
        const newNoteDate: HTMLElement = document.createElement("div");
        newNoteRow.className = "new-note-row";
        newNote.className = "note-items-title";
        newNoteDate.className = "new-note-date";
        newNote.id = `note ${i}`;
        newNote.innerHTML = notesArray[i].noteName;
        newNoteDate.innerHTML = notesArray[i].date.toLocaleString().substring(0,10);
        viewNotesContainer.appendChild(newNoteRow);
        newNoteRow.appendChild(newNote);
        newNoteRow.appendChild(newNoteDate);
        //changes start here to addd a new opening note box to display the note asynchronously on screen!!!
        newNoteRow.addEventListener("click", () => {
            
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
            showNoteElementText.className = "show-note-container-text";
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
    const viewFileContainer: HTMLElement = document.getElementById("project-view-files-id") as HTMLElement;
    const projectData: ProjectData = JSON.parse(window.localStorage.getItem("projectData") as string);
    console.log(projectData);
    const fileArray: Files[] = projectData.files;
    for (let i = 0; i < fileArray.length; i++) {
        const newFileContainer: HTMLDivElement = document.createElement("div");
        const newFile: HTMLAnchorElement = document.createElement("a");
        const newFileDate: HTMLParagraphElement = document.createElement("p");
        newFileContainer.className = "new-file-container";
        newFile.className = "file-items-title";
        newFileDate.className = "new-file-date";
        newFile.id = `file ${i}`;
        newFile.innerHTML = fileArray[i].fileName;
        newFile.href = fileArray[i].fileLocation as string;
        newFileDate.innerHTML = fileArray[i].fileUploadDate.toLocaleString().substring(0,10);
        //viewFileContainer.appendChild(newFile);
        viewFileContainer.appendChild(newFileContainer);
        newFileContainer.appendChild(newFile);
        newFileContainer.appendChild(newFileDate);
    }
}
//actually we don't need this bottom function for now
const showDeadlines = (): void => {
    
}

export { showNotes, showFiles };