import { useEffect, useState, useRef } from "react";
import { outOfBoundsClick, screenAdjuster } from "../navbar/NavbarActions";
import Navbar from "../navbar/Navbar";
import SlidingNavbar from "../navbar/SlidingNavbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../calendar/Calendar.css";
import { CalendarEventListReq } from "./CalenderEventListReq";
import { EventList } from "./CalendarTypes";

const localizer = momentLocalizer(moment);
const myEventsList = [
    {start: new Date(), end: new Date(), title: "special event"}
]

const CalendarTest = () => { 
    //below are our states
    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let [currentEventList , setCurrentEventList] = useState();
    let [updateOnce, setUpdateOnce] = useState();
    
    //let currentEventList: EventList[] = [];

    //let currentEventList: React.MutableRefObject<EventList[] | undefined> = useRef();
    //we can just take await moth and agenda since those two seem to be really messed up for some reason idk!!!

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
        const testFuncAgain = async () => {
            const eventList: any = await CalendarEventListReq();
            setCurrentEventList(eventList);
        };
        testFuncAgain();
    }, [updateOnce]);

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
                    <Calendar localizer={localizer} events={currentEventList/*myEventsList*/} style={{height: "100%", width: "100%"}}/>
                </div>
            </section>
        </div>
    );

}

 

export default CalendarTest;