import {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import "../register/Register.css";
import SlidingNavbar from "../navbar/SlidingNavbar";
import { outOfBoundsClick, screenAdjuster} from "../navbar/NavbarActions";
import registerUser from "./RegisterReq";
import { useNavigate } from "react-router-dom";

const Register = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);

    let navigate = useNavigate();
 
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
                    <form className="register-form" onSubmit={(e) => {registerUser(`http://localhost:8080/api/register`, e, navigate)}}>
                        <h3 className="register-form-title">Register Account</h3>
                        <input type="text" id="email-input-id" placeholder="Email" ></input>
                        <input type="password" id="pass-input-id" placeholder="Password"></input>
                        <a href="/login" className='register-link'>
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