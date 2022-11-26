import React from "react";

const outOfBoundsClick = (menuState: boolean, setMenuState: React.Dispatch<React.SetStateAction<boolean>>, counter: number, setCounter: React.Dispatch<React.SetStateAction<number>>): void => {

    const root: HTMLElement | null = document.getElementById("root");
    const hamburgerButton: HTMLElement | null = document.getElementById("hamburger-line-id")
    const slidingNavbar: HTMLElement | null = document.getElementById("sliding-navbar-id");

    if (menuState && counter >= 1) {
        hamburgerButton?.classList.remove("hamburger-line-transformed");
        slidingNavbar!.style.width = "0";

        setMenuState(false);
        setCounter(0);

    } else if (menuState) {
        setCounter(counter+=1);
    }
}

 

const screenAdjuster = (menuState: boolean, setMenuState: React.Dispatch<React.SetStateAction<boolean>>): void => {
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900 && menuState) {

            const hamburgerButton: HTMLElement | null = document.getElementById("hamburger-line-id");
            const slidingNavbar: HTMLElement | null = document.getElementById("sliding-navbar-id");
            const navbarLinks: HTMLElement | null = document.getElementById("hamburger-links-container-id");

            hamburgerButton?.classList.remove("hamburger-line-transformed");
            slidingNavbar!.style.width = "0";

            setMenuState(false);
        }

    })

}

 

export {outOfBoundsClick, screenAdjuster};