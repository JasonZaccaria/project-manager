import { FormEvent } from "react";

import { projectResponse } from "./ProjectTypes";

import { get } from "../requestShortcuts/RequestShortcut";

//the below function sends a fetch request to our server to get our projects

//we need to return our title.,

//So after thinking about this. I honestly may not need an auth call at all really. That should be a backend thing wehre the backend

//can use middleware to check for auth each time instead of us checking in for it each time

//so then this won't need any paramters as our session id gets sent right on the fetch call as a cookie that the server can read from

//this makes things less complicated

 

//an issue i am havin gis that i fwe creat this function just to get some data from the database. We will still need to make a second call

//when we go ahead and let user open their project and then have to go and grab their data one more time

 

const GetProjects = async (url: string): Promise<void> => {

   

    const readResponse: projectResponse = await get(url);

    console.log(readResponse);

   

    //first we will save an array of each key in the response array. These keys will be the names for each project so we can access them again if needed

    const titleArray: string[] = Object.keys(readResponse);

    window.localStorage.setItem("titles", JSON.stringify(titleArray));

 

    //we will iterate through the length of the response keys. THen we will take each key and get the data for that specific response and create elemtns

    for (let i = 0; i < Object.keys(readResponse).length; i++) {

       

        //we will save all project data to localstorage first

        let saveTitle: string = Object.keys(readResponse)[i];

        window.localStorage.setItem(saveTitle, JSON.stringify(readResponse[saveTitle]));

 

        //now we can grab our project area element which will act as our parent element we will append our cards to

        const projectArea: HTMLElement | null = document.getElementById("project-area-id");

 

        //after grabbing our project area we now need to create our project card containers

        const projectCard: HTMLElement | null = document.createElement("div");

        projectCard.classList.add("project-card");

 

        //now that we have created the div that is the project container we need to add in our title

        const projectTitle: HTMLElement | null = document.createElement("h3");

        projectTitle.innerHTML = Object.keys(readResponse)[i];

        projectTitle.classList.add("project-title");

 

        //now we add the project date

        const projectDate: HTMLElement | null = document.createElement("p");

        projectDate.innerHTML = readResponse[Object.keys(readResponse)[i]]["date"]//"12/25/2021";

        projectDate.classList.add("project-date");

 

        //now we have to add a button to each card

        const projectButton = document.createElement("button");

        projectButton.innerHTML = "Open Project";

        projectButton.id = `project-${i+1}`;

        //thsi event listener will wait for a click to happen ehtne location.navitgate to another route which will be our special route

        //we can make this easeier by having a dynamic routing system where on this specific button click we grab the title and we

        //create a route name for that route and then grab the data specific to that project from localstorage

        projectButton.addEventListener("click", () => {

            //here we have to grab that specific cards title and use that to navigate us to our dynamnic route

            //then that route will handle grabbign the dta from our localstorage

            let getTitle: string | null | undefined = projectButton.parentNode?.firstChild?.textContent;

            console.log(getTitle);

            //now we need to have the user be send off the the new url with this gettitle enterd in as the url param

            //navigate(`/projectpage/${getTitle}`, {replace: true});

            window.location.replace(`/projectpage/${getTitle}`);

        })

        projectButton.classList.add("project-button");

 

        //now we need to add the data to them and configure our child nodes

        projectArea?.appendChild(projectCard);

        projectCard.appendChild(projectTitle);

        projectCard.appendChild(projectDate);

        projectCard.appendChild(projectButton);

 

    }

   

}

 

export default GetProjects;