
import './App.css'
import Navbar from "./components/Navbar.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/FeatMoviesList.jsx"
import MoviePage from "./components/MoviesPage.jsx"
import NotFound from "./components/NotFound.jsx"
import Profile from "./components/Profile.jsx"

function App() {

  return (
    <div className="app-container">
       <Navbar />
       <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchmovies" element={<MoviePage/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
      
    
   
    </div>

  )
}

export default App
