import {useState, useEffect, FormEvent, FormEventHandler} from "react";
import "../getproject/GetProject.css";
import Navbar from '../navbar/Navbar';
import {outOfBoundsClick, screenAdjuster} from "../navbar/NavbarActions"
import SlidingNavbar from '../navbar/SlidingNavbar';
import { GetProjects, projectRender, projectNavigator, createProject } from "./GetProjectService";
import { useNavigate } from "react-router-dom";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import SlidingNavbarLoggedIn from "../navbar/SlidingNavbarLoggedIn";

const GetProject = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [updateOnce, setUpdateOnce] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    useEffect(() => {
        projectRender(process.env.REACT_APP_API_GET_PROJECTS as string, GetProjects, projectNavigator, navigate);

    }, [updateOnce])

    return (
        <div className="GetProject" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbarLoggedIn />
            <header className="home-header">
                <NavbarLoggedIn hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
            <section>
                <h2 className="getproject-title">Get Started And Create a New Project</h2>
                <form className="getproject-form">
                    <button type="submit" className="getproject-create" onClick={createProject}>Create Project</button>
                </form>
                <div className="project-area" id="project-area-id"></div>
            </section>
        </div>
    );
}

export default GetProject;