import {useState, useEffect, FormEvent, FormEventHandler} from "react";
import "../getproject/GetProject.css";
import Navbar from '../navbar/Navbar';
import {outOfBoundsClick, screenAdjuster} from "../navbar/NavbarActions"
import SlidingNavbar from '../navbar/SlidingNavbar';
import { GetProjects, projectRender, projectNavigator, createProject } from "./GetProjectService"; //testing import for project getter service
import { useNavigate } from "react-router-dom";

const GetProject = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [updateOnce, setUpdateOnce] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    useEffect(() => {
       // GetProjects(`http://localhost:8080/api/projects`);
        projectRender("http://localhost:8080/api/projects", GetProjects, projectNavigator, navigate);

    }, [updateOnce])

    return (
        <div className="GetProject" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header className="home-header">
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
            <section>
                <h2 className="getproject-title">Get Started And Create a New Project</h2>
                <form /*action="/projectcreate"*/ className="getproject-form">
                    <button type="submit" className="getproject-create" onClick={createProject}>Create Project</button>
                </form>
                <div className="project-area" id="project-area-id"></div>
            </section>
        </div>
    );
}

export default GetProject;