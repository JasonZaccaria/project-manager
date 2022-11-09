import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { outOfBoundsClick, screenAdjuster } from "../navbar/NavbarActions";
import SlidingNavbar from "../navbar/SlidingNavbar";
import { ProjectCreator } from "./ProjectCreateService";

const ProjectCreate = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [updateOnce, setUpdateOnce] = useState(0);

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    return (
        <div className="projectCreate" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header className='projectCreate-header'>
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
            <section className="projectCreate-section">
                <form className="projectCreate-form" /*onSubmit={(e) => ProjectCreator("http://localhost:8080/api/createproject", e)}*/>
                    <input type={"text"} name="projectName" id="project-name-input"></input>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>
    );
}

export default ProjectCreate;