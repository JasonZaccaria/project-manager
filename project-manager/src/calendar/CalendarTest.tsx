import { useEffect, useState, useRef } from "react";
import { outOfBoundsClick, screenAdjuster } from "../navbar/NavbarActions";
import SlidingNavbar from "../navbar/SlidingNavbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../calendar/Calendar.css";
import { CalendarEventListReq } from "./CalenderEventListReq";
import { EventList } from "./CalendarTypes";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";

const localizer = momentLocalizer(moment);

const CalendarTest = () => { 

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [currentEventList , setCurrentEventList] = useState();
    let [updateOnce, setUpdateOnce] = useState();

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
        const updateEventList = async () => {
            const eventList: any = await CalendarEventListReq();
            setCurrentEventList(eventList);
        };
        updateEventList();
    }, [updateOnce]);

    return (
        <div className="calendar" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header className="calendar-header">
                <NavbarLoggedIn hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
            <section className="select-month-navbar"></section>
            <section className="calendar-body">
                <div className="calendar-container">
                    <div className="addToCalendar"></div>
                    <Calendar localizer={localizer} events={currentEventList} style={{height: "100%", width: "100%"}}/>
                </div>
            </section>
        </div>
    );

}

 

export default CalendarTest;