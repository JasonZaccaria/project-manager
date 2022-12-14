import { useState, useEffect, FormEventHandler, FormEvent } from "react";
import { convertToObject } from "typescript";
import { outOfBoundsClick, screenAdjuster} from "../navbar/NavbarActions";
import "../login/Login.css";
import Navbar from "../navbar/Navbar";
import SlidingNavbar from "../navbar/SlidingNavbar";
import loginUser from "./LoginRequest";
import { useNavigate } from "react-router-dom";

const Login = () => {
    console.log(process.env.REACT_APP_API_LOGIN as string);
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
            <div className="login-error-box" id="login-error-box-id">Incorrect Email or Password!</div>
            <section className="login-content">
                <div className="login-container">
                    <form className="login-form" onSubmit={(e) => {loginUser(process.env.REACT_APP_API_LOGIN as string, e, navigate)}} action="/">
                        <h3 className="login-form-title">Login</h3>
                        <input type="text" id="login-email-input-id" placeholder="Email" ></input>
                        <input type="password" id="login-pass-input-id" placeholder="Password" ></input>
                        <a href="/register" className="login-link">
                            <p className="login-question">Don't have an account yet?</p>
                        </a>
                        <button type="submit" id="login-submit-id">Submit</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;