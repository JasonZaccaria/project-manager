import {useState, useEffect, FormEvent, FormEventHandler} from "react";
import "../getproject/GetProject.css";
import Navbar from '../navbar/Navbar';
import {outOfBoundsClick, screenAdjuster} from "../navbar/NavbarActions"
import SlidingNavbar from '../navbar/SlidingNavbar';
import GetProjects from "./ProjectGetter"; //testing import for project getter service
import { useNavigate } from "react-router-dom";

const GetProject = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    //state below is for items that are only supposed to update once on page load
    let [updateOnce, setUpdateOnce] = useState(0);

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    useEffect(() => {
        //calling our get projects function only on page load
        GetProjects(`${process.env.REACT_APP_SERVER}/tt/`);

    }, [updateOnce])

    //On page load we need to be able to make a request to the server to get data. This will show us our current projects and what we have to upload
    //this involves authentication with sessions along with a request to our databse to grab that data and respond with json back
    //for new users this page will only have a title and button to creat new projets but for users with existing projects they will be able to see them
    //all pop up as cards on the screen in two columns and one column on mobile!!!
    //once clicked they will be rerouted to the project managemetn page instead of project create

    return (
        <div className="GetProject" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header className="home-header">
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
            <section>
                <h2 className="getproject-title">Get Started And Create a New Project</h2>
                <form action="/projectcreate" className="getproject-form">
                    <button type="submit" className="getproject-create">Create Project</button>
                </form>
                <div className="project-area" id="project-area-id"></div>
            </section>
        </div>
    );
}

export default GetProject;