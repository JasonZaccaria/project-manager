import React from "react";

 

const outOfBoundsClick = (menuState: boolean, setMenuState: React.Dispatch<React.SetStateAction<boolean>>, counter: number, setCounter: React.Dispatch<React.SetStateAction<number>>): void => {

    //we need to check to see if menu is active

    //then we need to llisten in for another click on screen

    //then after that click we close the sidebar, menu button, and reset our states

    const root: HTMLElement | null = document.getElementById("root");

    const hamburgerButton: HTMLElement | null = document.getElementById("hamburger-line-id")

    const slidingNavbar: HTMLElement | null = document.getElementById("sliding-navbar-id");

    if (menuState && counter >= 1) {

        console.log("close");

        /*changes below*/

        hamburgerButton?.classList.remove("hamburger-line-transformed");

        slidingNavbar!.style.width = "0";

        setMenuState(false);

        /*changes stop here*/

        setCounter(0);

    } else if (menuState) {

        setCounter(counter+=1);

    }

   console.log(counter);

}

 

const screenAdjuster = (menuState: boolean, setMenuState: React.Dispatch<React.SetStateAction<boolean>>): void => {

    /*This function checks for changes in screen size above 900px and hides the sliding navbar as well as hamburger button and displays our regular navbar links at the top*/

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900 && menuState) {

            const hamburgerButton: HTMLElement | null = document.getElementById("hamburger-line-id");

            const slidingNavbar: HTMLElement | null = document.getElementById("sliding-navbar-id");

            const navbarLinks: HTMLElement | null = document.getElementById("hamburger-links-container-id");

            hamburgerButton?.classList.remove("hamburger-line-transformed");

            slidingNavbar!.style.width = "0";

            //navbarLinks!.style.display = "flex";

            setMenuState(false);

        }

    })

}

 

export {outOfBoundsClick, screenAdjuster};