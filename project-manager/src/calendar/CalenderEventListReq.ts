import { Deadlines } from "../viewproject/deadlines/DeadlinesType";

/*const CalendarEventListReq = async (url: string): Promise<void> => {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("jwt") as string}`
        }
    })

    const readResponse = await response.json();
    console.log(readResponse);
}*/

import { ProjectData } from "../viewproject/ProjectData";
import { EventList } from "./CalendarTypes";

//above function not being used

const CalendarEventListReq = async (): Promise<EventList[]>  => {
    const projectData: ProjectData = JSON.parse(window.localStorage.getItem("projectData") as string);
    const deadlines: Deadlines[] = projectData.deadlines;
    const eventList: EventList[] = [];
    console.log(projectData);
    console.log(new Date());
    for (let i = 0; i < deadlines.length; i++) {
        const newDeadlineDate: Date = deadlines[i].deadlineDate;
        const newDeadlineNote: string = deadlines[i].deadlineNote;
        const newDeadline: EventList = {start: newDeadlineDate, end: newDeadlineDate, title: newDeadlineNote};
        eventList.push(newDeadline);
    }
    return eventList;
}


export { CalendarEventListReq };