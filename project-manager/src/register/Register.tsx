import {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import "../register/Register.css";
import SlidingNavbar from "../navbar/SlidingNavbar";
import { outOfBoundsClick, screenAdjuster} from "../services/NavbarActions";
import { registerUser } from "../services/Auth";

const Register = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
 
    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });
 
    return (
        <div className="register" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header>
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount} />
            </header>
            <section className="register-content">
                <div className="register-container">
                    <form className="register-form" onSubmit={(e) => {registerUser(`${process.env.REACT_APP_SERVER}/tt/`, e)}}>
                        <h3 className="register-form-title">Register Account</h3>
                        <input type="text" id="email-input-id" placeholder="Email" ></input>
                        <input type="password" id="pass-input-id" placeholder="Password" ></input>
                        <a href="/login">
                            <p className="register-question">Already have an account?</p>
                        </a>
                        <button type="submit" id="register-submit-id">Submit</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

 

export default Register;