import "../viewproject/ViewProject.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { outOfBoundsClick, screenAdjuster } from "../navbar/NavbarActions";
import Navbar from "../navbar/Navbar";
import SlidingNavbar from "../navbar/SlidingNavbar";
import { getProjectData } from "./GetProjectDataReq";
import { uploadFile } from "./files/UploadFile";
import { UploadNote } from "./note/UploadNote";
import { UploadDeadlines } from "./deadlines/UploadDeadlines";
import { showFiles, showNotes } from "./ShowData";

const ViewProject = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [updateOnce, setUpdateOnce] = useState();

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    useEffect(() => {
        const udpateData = async () => {
            await getProjectData();
            showNotes();
            showFiles();
        }
        udpateData();
    }, [updateOnce]);

    return (
        <div className="viewproject" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header>
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
            
            <div className="project-content-top">
                <div className="project-content-top-left">
                    <div className="project-view-notes" id="project-view-notes-id">
                        <h3 className="project-view-notes-title">Notes</h3>
                    </div>
                    <div className="project-view-files" id="project-view-files-id">
                    <h3 className="project-view-files-title">Files</h3>
                    </div>
                </div>
                <div className="project-content-top-right">
                    <div className="project-view-deadlines">
                        <h3 className="project-view-deadlines-title">Deadlines</h3>
                            <Link to={"/calendar"}>
                                <button type="button" className="project-view-deadlines-button">Calendar</button>
                            </Link>
                    </div>
                    <div className="project-create-deadlines">
                        <h3 className="project-create-new-deadline">Create New Deadline</h3>
                        <form className="project-create-deadline-form" onSubmit={(e) => UploadDeadlines("http://localhost:8080/api/deadlines/create", e)}>
                            <input type={"text"} placeholder="Title" className="project-create-deadlines-title" id="deadlines-note-input-id"></input>
                            <input type={"datetime-local"} className="project-create-deadlines-date" id="deadlines-input-id"></input>
                            <button type={"submit"} className="project-create-deadlines-button">Create</button>
                        </form>
                    </div>
                    <div className="project-create-files">
                        <h3 className="project-create-files-title">Upload New File</h3>
                        <form className="project-create-files-form" onChange={uploadFile}>
                            <label htmlFor="file-input-id" className="project-create-input-label">Upload</label>
                            <input type={"file"} className="project-create-files-input" id="file-input-id"></input>
                        </form>
                    </div>
                </div>
            </div>
            <div className="project-content-bottom">
                <div className="project-content-container">
                    <h3 className="upload-notes-title">Upload New Note</h3>
                    <form className="upload-notes-form" action="/" id="upload-notes-form-id" onSubmit={UploadNote}>
                        <input type={"text"} className="upload-notes-title-input"  id="note-name-input-id" placeholder="Note Title"></input>
                        <textarea className="upload-notes-body" id="note-input-id"></textarea>
                        <button type={"submit"} className="upload-notes-button">Create Note</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewProject;