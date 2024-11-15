import "./Navbar.css";

function Navbar() {
    return (
      <>
        <div className="topnav">
            <a href="/" className="logo">
              <img src="src/assets/Cubebuster-Logo-1996.png" alt="Logo" />
            </a>
            <div className="nav-links">
                <a className="active" href="/">Home</a>
                <a href="searchmovies">Movies</a>
                <a href="rentals">My Rentals</a>
                <a href="profile">Profile</a>
            </div>
        </div>
      </>
    );
}

export default Navbar;
