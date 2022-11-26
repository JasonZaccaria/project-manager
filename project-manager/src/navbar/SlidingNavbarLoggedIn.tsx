import "../navbar/SlidingNavbar.css"

function SlidingNavbarLoggedIn() {
    return (
        <div className="sliding-navbar" id="sliding-navbar-id">
            <div className="sliding-title">Menu</div>
            <div className="sliding-links">
                <a href="/logout" className="sliding-navbar-links" onClick={() => window.localStorage.removeItem("jwt")}>
                    <p>Logout</p>
                </a>
                <a href="/getproject" className="sliding-navbar-links">
                    <p>Projects</p>
                </a>
            </div>
        </div>
    );
}

export default SlidingNavbarLoggedIn;