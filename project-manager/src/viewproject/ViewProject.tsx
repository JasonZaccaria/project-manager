import "../viewproject/ViewProject.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { outOfBoundsClick, screenAdjuster } from "../navbar/NavbarActions";
import Navbar from "../navbar/Navbar";
import SlidingNavbar from "../navbar/SlidingNavbar";
import { getProjectData } from "./GetProjectDataReq";
import { uploadFile } from "./UploadFile";
import { UploadNote } from "./note/UploadNote";
import { UploadDeadlines } from "./deadlines/UploadDeadlines";
import { showNotes } from "./ShowData";

const ViewProject = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [updateOnce, setUpdateOnce] = useState();

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    useEffect(() => {
        getProjectData(); //used to get our notes, deadlines, and files from server
        showNotes();
    }, [updateOnce])

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
                    <div className="project-view-files"></div>
                </div>
                <div className="project-content-top-right">
                    <div className="project-view-deadlines"></div>
                    <div className="project-create-deadlines"></div>
                    <div className="project-create-files"></div>
                </div>
            </div>
            <div className="project-content-bottom">
                <form className="upload-notes-form" action="/" id="upload-notes-form-id">
                    <input type={"text"} className="upload-notes-title-input"></input>
                    <textarea className="upload-notes-body"></textarea>
                </form>
            </div>

            <section className="project-content-section">
                <form className="upload-files-form" onChange={uploadFile}>
                    <input type={"file"} id="file-input-id" /*onChange={uploadFile}*/></input>
                </form>
                <form className="upload-notes-form" onSubmit={UploadNote}>
                    <input type={"text"} id="note-name-input-id"></input>
                    <input type={"text"} id="note-input-id"></input>
                    <button type={"submit"}>submit note</button>
                </form>
                <form className="upload-deadlines-form" onSubmit={(e) => UploadDeadlines("http://localhost:8080/api/deadlines/create", e)}>
                    <input type={"text"} id="deadlines-note-input-id"></input>
                    <input type={"datetime-local"} id="deadlines-input-id"></input>
                    <button type={"submit"}>create new deadline</button>
                </form>
            </section>
        </div>
    );
}

export default ViewProject;