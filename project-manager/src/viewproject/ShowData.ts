import { ProjectData } from "./ProjectData";

const showNotes = (): void => {
    //we need to grab our our data for notes and display it noscreen
    //first we need to grab our div container we will be storing these objects insid eof
    //then we need to populate it with links which will open up a new page just showing our note
    //or even just a popup that will then allow users to delete that note
    //easiest option would maybe be to make the stuff just pop up on screen so we lessen the load
    //of server calls overall
    const viewNotesContainer: HTMLElement = document.getElementById("project-view-notes-id") as HTMLElement;
    const notesJSONString: string = JSON.stringify(window.localStorage.getItem("projectData"));
    const notesObject = JSON.parse(notesJSONString);
    console.log(notesObject.notes);
}

const showFiles = (): void => {

}
//actually we don't need this bottom function for now
const showDeadlines = (): void => {

}

export { showNotes };