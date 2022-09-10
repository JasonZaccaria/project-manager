import "../viewproject/ViewProject.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { outOfBoundsClick, screenAdjuster } from "../services/NavbarActions";
import Navbar from "../navbar/Navbar";
import SlidingNavbar from "../navbar/SlidingNavbar";
 
const ViewProject = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    //we grab url params below
    let {id} = useParams();
    let idToString = JSON.stringify(id);
    console.log(typeof window.localStorage.getItem("firstproject"));
    //now we need to check local storage for data and if none then we make get request to server
    if (JSON.stringify(window.localStorage.getItem(idToString)) !== null) {
        console.log(JSON.stringify(window.localStorage.getItem(idToString)));
    } else {
        console.log("no");
    }
    return (
        <div className="viewproject" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header>
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
            <section className="project-content-section">
            </section>
        </div>
    );
}

export default ViewProject;