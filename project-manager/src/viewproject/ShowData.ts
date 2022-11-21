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
            const showNoteElementDelete: HTMLButtonElement = document.createElement("button");

            showNoteElement.className = "show-note-container";
            showNoteElementTop.className = "show-note-container-top";
            showNoteElementTitle.innerHTML = notesArray[i].noteName;
            showNoteElementTitle.className = "show-note-container-title";
            showNoteElementClose.className = "show-note-container-close";
            showNoteElementText.className = "show-note-container-text";
            showNoteElementClose.innerHTML = "X";
            showNoteElementText.innerHTML = notesArray[i].note;
            showNoteElementDelete.innerHTML = "X";
            showNoteElementDelete.className= "show-note-delete";

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
                    /*try {
                        const deleteResponse = await fetch("http://localhost:8080/api/notes/delete", {
                            method: "POST",
                            mode: "cors",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
                            },
                            body: JSON.stringify({noteId: notesArray[i].id})
                        })
                        const getResponse = await deleteResponse.text();
                        console.log(getResponse);
                    }*/
                    try {
                    const response: Response = await fetch("http://localhost:8080/api/notes/delete", {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
                        },
                        body: JSON.stringify(notesArray[i].id)
                    })
                    const responseAwait: string = await response.text();
                    console.log(responseAwait);
                    //now we need to add logic here to test to delete our object asynchronously on the page
                    newNoteRow.remove();
                    showNoteElement.remove();
                    deletePopUp.remove();
                    app.style.pointerEvents = "none";
                    }catch (e) {
                        console.log(e);
                    }
                })

            })

            showNoteElementClose.addEventListener("click", () => {
                showNoteElement.remove();
                const showDeletePopup: HTMLElement | null = document.getElementById("delete-element-container-id");
                if (showDeletePopup != null) {
                    showDeletePopup.remove();
                }
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
        const newFileDelete: HTMLButtonElement = document.createElement("button");
        newFileContainer.className = "new-file-container";
        newFile.className = "file-items-title";
        newFileDate.className = "new-file-date";
        newFile.id = `file ${i}`;
        newFile.innerHTML = fileArray[i].fileName;
        newFile.href = fileArray[i].fileLocation as string;
        newFileDate.innerHTML = fileArray[i].fileUploadDate.toLocaleString().substring(0,10);
        newFileDelete.innerHTML = "X";
        newFileDelete.className = "new-file-delete";
        //viewFileContainer.appendChild(newFile);
        viewFileContainer.appendChild(newFileContainer);
        newFileContainer.appendChild(newFile);
        newFileContainer.appendChild(newFileDate);
        newFileContainer.appendChild(newFileDelete);

        newFileDelete.addEventListener("click", () => {
            const app: HTMLElement = document.getElementById("App-id") as HTMLElement;
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

            app.style.pointerEvents = "none";

            deleteNo.addEventListener("click", () => {
                deletePopUp.remove();
                app.style.pointerEvents = "all";
            });

            deleteYes.addEventListener("click", async () => {
                try {
                    const response: Response = await fetch("http://localhost:8080/api/files/delete", {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
                        },
                        body: JSON.stringify(fileArray[i].id)
                    });
                    deletePopUp.remove();
                    app.style.pointerEvents = "all";
                } catch (e) {

                }
            });
        });
    }
}
//actually we don't need this bottom function for now
const showDeadlines = (): void => {
    
}

export { showNotes, showFiles };