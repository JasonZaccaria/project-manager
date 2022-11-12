import "../navbar/SlidingNavbar.css"

function SlidingNavbar() {
    return (
        <div className="sliding-navbar" id="sliding-navbar-id">
            <div className="sliding-title">Menu</div>
            <div className="sliding-links">
                <a href="/login" className="sliding-navbar-links">
                    <p>Login</p>
                </a>
                <a href="/register" className="sliding-navbar-links">
                    <p>Register</p>
                </a>
                <a href="/getproject" className="sliding-navbar-links">
                    <p>Projects</p>
                </a>
            </div>
        </div>
    );
}

export default SlidingNavbar;