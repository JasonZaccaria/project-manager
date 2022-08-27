import "../styles/ViewProject.css";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { outOfBoundsClick, screenAdjuster } from "../services/NavbarActions";

import Navbar from "./Navbar";

import SlidingNavbar from "./SlidingNavbar";

//so on this component we will want to view our actual project data and see any notes, deadlines, and goals, along with start date and dates on each item

//so in order to not have to worry about massive amounts of server issues we should only have to make this request just once and save that data all in local storage

//then we can look at that data on this page unless if its not here then we make a request to grab it

//this will first be done when we grab our data on our getproject component

//however if that is never activated we can do that here as well

 

const ViewProject = () => {

 

    //below are our states

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