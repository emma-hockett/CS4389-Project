import "./Navbar.css"

function Navbar() {
  
    return (
      <>
         <div className="topnav">
            <a className="active" href="/">Home</a>
             <a href="searchmovies">Movies</a>
            <a href="rentals">My Rentals</a>
            <a href="profile">Profile</a>
            <a href="signin">Sign In</a>
            {/* Link to= instead? I see it being used some places but I know 0 js 
                also why there no leading forward slash? */}
        </div>
      </>
  
    )
  }
  
  export default Navbar