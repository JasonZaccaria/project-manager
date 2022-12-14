import React, {useState, useCallback, useEffect} from 'react';
import "../homepage/Home.css";
import Navbar from '../navbar/Navbar';

import {outOfBoundsClick, screenAdjuster} from "../navbar/NavbarActions"
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import SlidingNavbar from '../navbar/SlidingNavbar';
import SlidingNavbarLoggedIn from '../navbar/SlidingNavbarLoggedIn';
import { homeVerifyLogin } from './HomeLoginService';

function Home() {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
        homeVerifyLogin(setLoggedIn);
    });
    
    if (loggedIn) {
        return (
            <div className="home" id="home-id" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
                <SlidingNavbarLoggedIn />
                <header className="home-header">
                    <NavbarLoggedIn hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
                </header>
                <section className="top">
                    <section className="description-sections">
                        <h2 className="description-title">Have the power to schedule deadlines, stay organized, and create projects that you can share with those around you!</h2>
                    </section>
                    <section className="main-content">
                        <img src={require("../assets/showprojects.png")} className="home-img"></img>
                        <div className="description-right">
                            <p className="description-p">From your user page you can quickly create, manage, and update existing projects all with the touch of a button. Each project comes equipped with the ability to set up goals and deadlines that will keep you organized and up to date. Sign up below and see how easy it is to start managing projects today!</p>
                            <a href="/register" className="sign-up-button-link">
                                <button type='submit' className="sign-up-button">Sign up</button>
                            </a>
                        </div>
                    </section>
                </section>
                <section className="bottom">
                    <section className="description-sections">
                        <h2 className="description-title">It's time to increase productivity and organization. Join us today!</h2>
                    </section>
                    <section className="main-content" id="main-content-id-2">
                        <div className="description-left">
                            <p className="description-p">From your user page you can quickly create, manage, and update existing projects all with the touch of a button. Each project comes equipped with the ability to set up goals and deadlines that will keep you organized and up to date.</p>
                            <a href="/register" className='sign-up-button-link' id="link-spacing">
                                <button type='submit' className="sign-up-button" id="sign-up-button-id">Sign up</button>
                            </a>
                        </div>
                        <img src={require("../assets/showworkflow.png")} className="home-img"></img>
                    </section>
                </section>
            </div>
        );
    } else {
        return (
            <div className="home" id="home-id" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
                <SlidingNavbar />
                <header className="home-header">
                    <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
                </header>
                <section className="top">
                    <section className="description-sections">
                        <h2 className="description-title">Have the power to schedule deadlines, stay organized, and create projects that you can share with those around you!</h2>
                    </section>
                    <section className="main-content">
                        <img src={require("../assets/showprojects.png")} className="home-img"></img>
                        <div className="description-right">
                            <p className="description-p">From your user page you can quickly create, manage, and update existing projects all with the touch of a button. Each project comes equipped with the ability to set up goals and deadlines that will keep you organized and up to date. Sign up below and see how easy it is to start managing projects today!</p>
                            <a href="/register" className="sign-up-button-link">
                                <button type='submit' className="sign-up-button">Sign up</button>
                            </a>
                        </div>
                    </section>
                </section>
                <section className="bottom">
                    <section className="description-sections">
                        <h2 className="description-title">It's time to increase productivity and organization. Join us today!</h2>
                    </section>
                    <section className="main-content" id="main-content-id-2">
                        <div className="description-left">
                            <p className="description-p">Have all of your projects in one easy to reach place online. Project management has never been easier, your personal dashboard is unique to each project your working on. No more overlapping data, and more emphasis on seperation of concerns.</p>
                            <a href="/register" className='sign-up-button-link' id="link-spacing">
                                <button type='submit' className="sign-up-button" id="sign-up-button-id">Sign up</button>
                            </a>
                        </div>
                        <img src={require("../assets/showworkflow.png")} className="home-img"></img>
                    </section>
                </section>
            </div>
        );
    }

    
}

export default Home;