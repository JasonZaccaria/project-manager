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

const ViewProject = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [updateOnce, setUpdateOnce] = useState();

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    useEffect(() => {
        getProjectData(); //used to get our notes, deadlines, and files from server
    }, [updateOnce])

    return (
        <div className="viewproject" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header>
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
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