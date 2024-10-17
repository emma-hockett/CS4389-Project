import "./Navbar.css"

function Navbar() {
  
    return (
      <>
         <div className="topnav">
            <a className="active" href="/">Home</a>
             <a href="searchmovies">Movies</a>
            <a href="rentals">My Rentals</a>
            <a href="profile">Profile</a>
        </div>
      </>
  
    )
  }
  
  export default Navbar