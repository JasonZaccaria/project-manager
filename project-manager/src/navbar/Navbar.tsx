import React, {useState, useEffect} from 'react';
import "../navbar/Navbar.css";

function Navbar(props: any) {

    let hamburger = props.hamburger;
    let count = props.count;
    let setHamburger = props.setHamburger;
    let setCount = props.setCount;

    const onHamburgerClick = (menuState: React.Dispatch<React.SetStateAction<boolean>>, counter: number, setCounter: React.Dispatch<React.SetStateAction<number>>): void => {
        const hamburgerLine: HTMLElement | null = document.getElementById("hamburger-line-id");
        const slidingNavbar: HTMLElement | null = document.getElementById("sliding-navbar-id");
        if (!hamburger) {
            hamburgerLine?.classList.add("hamburger-line-transformed");
            slidingNavbar!.style.width = "60%";
            menuState(true);
            setCounter(counter+=1);
        } else {
            hamburgerLine?.classList.remove("hamburger-line-transformed");
            slidingNavbar!.style.width = "0";
            menuState(false);
            setCounter(counter+=1);
        }
    }
    return (
        <div className="navbar">
            <a href="/" className='navbar-title-a'>
                <h1 className="navbar-title">MyProjectVision</h1>
            </a>
            <div className="navbar-links-container" id="hamburger-links-container-id">
                <a href="/login" className="links">Login</a>
                <a href="/register" className="links">Register</a>
                <a href="/getproject" className="links">Projects</a>
            </div>
            <div className="hamburger-container" onClick={() => {onHamburgerClick(setHamburger, count, setCount)}}>
                <div className="hamburger-line" id="hamburger-line-id"></div>
            </div>
        </div>
    );
}

 

export default Navbar;