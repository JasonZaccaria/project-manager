import { Notes } from "./note/NotesType";
import { ProjectData } from "./ProjectData";

const showNotes = async (): Promise<void> => {
    //we need to grab our our data for notes and display it noscreen
    //first we need to grab our div container we will be storing these objects insid eof
    //then we need to populate it with links which will open up a new page just showing our note
    //or even just a popup that will then allow users to delete that note
    //easiest option would maybe be to make the stuff just pop up on screen so we lessen the load
    //of server calls overall
    //Ok so now i can show the title of all of our notes. Now i just need to mkae it so that when a user decides to update that shit it will update automatically not updates on page
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
    }
}

const showFiles = (): void => {

}
//actually we don't need this bottom function for now
const showDeadlines = (): void => {

}

export { showNotes };