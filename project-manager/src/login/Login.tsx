import { useState, useEffect, FormEventHandler, FormEvent } from "react";
import { convertToObject } from "typescript";
import { outOfBoundsClick, screenAdjuster} from "../navbar/NavbarActions";
import "../login/Login.css";
import Navbar from "../navbar/Navbar";
import SlidingNavbar from "../navbar/SlidingNavbar";
import loginUser from "./LoginRequest";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let [hamburger, setHamburger] = useState(false);
    let [count, setCount] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        screenAdjuster(hamburger, setHamburger);
    });

    return (
        <div className="login" onClick={() => {outOfBoundsClick(hamburger, setHamburger, count, setCount)}}>
            <SlidingNavbar />
            <header>
                <Navbar hamburger={hamburger} setHamburger={setHamburger} count={count} setCount={setCount} />
            </header>
            <section className="login-content">
                <div className="login-container">
                    <form className="login-form" onSubmit={(e) => {loginUser(`http://localhost:8080/api/login`, e, navigate)}} action="/">
                        <h3 className="login-form-title">Login</h3>
                        <input type="text" id="login-email-input-id" placeholder="Email" ></input>
                        <input type="password" id="login-pass-input-id" placeholder="Password" ></input>
                        <a href="/" className="login-link">
                            <p className="login-question">Forgot password or email?</p>
                        </a>
                        <button type="submit" id="login-submit-id">Submit</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;