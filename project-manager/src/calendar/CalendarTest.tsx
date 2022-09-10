import { useEffect, useState } from "react";
import { outOfBoundsClick, screenAdjuster } from "../navbar/NavbarActions";
import Navbar from "../navbar/Navbar";
import SlidingNavbar from "../navbar/SlidingNavbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../calendar/Calendar.css";

const localizer = momentLocalizer(moment);
const myEventsList = [{
    start: new Date(), end: new Date(), title: "special event"
}]

const CalendarTest = () => { 
    //below are our states
    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    return (
        <div className="calendar" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header className="calendar-header">
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount}/>
            </header>
            <section className="select-month-navbar"></section>
            <section className="calendar-body">
                <div className="calendar-container">
                    <div className="addToCalendar"></div>
                    <Calendar localizer={localizer} events={myEventsList} style={{height: "100%", width: "100%"}}/>
                </div>
            </section>
        </div>
    );

}

 

export default CalendarTest;