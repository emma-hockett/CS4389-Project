
import './App.css'
import Navbar from "./components/Navbar.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/FeatMoviesList.jsx"
import MoviePage from "./components/MoviesPage.jsx"
import NotFound from "./components/NotFound.jsx"
import Profile from "./components/Profile.jsx"
import SignIn from "./components/SignIn.jsx"

function App() {

  return (
    <div className="app-container">
       <Navbar />
       <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchmovies" element={<MoviePage/>} />
        <Route path="*" element={<NotFound />} /> {/* not sure but we're missing rentals at the moment? */}
        <Route path="/profile" element={<Profile />} />
         <Route path="/signin" element={<SignIn />} /> {/* New route for Sign In */}
      </Routes>
    </Router>
      
    
   
    </div>

  )
}

export default App
