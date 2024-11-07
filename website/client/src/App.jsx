
import './App.css'
import Navbar from "./components/Navbar.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/FeatMoviesList.jsx"
import MoviePage from "./components/MoviesPage.jsx"
import NotFound from "./components/NotFound.jsx"
import Profile from "./components/Profile.jsx"
import RentPage from "./components/RentPage.jsx"
import Login from "./components/Login.jsx"
import MyRentals from './components/MyRentals.jsx';

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
        <Route path="/rentals" element={<MyRentals />} />
        <Route path="/req" element={<RentPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
      
    
   
    </div>

  )
}

export default App
