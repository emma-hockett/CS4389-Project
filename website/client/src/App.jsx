
import './App.css'
import Navbar from "./components/Navbar.jsx"
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from "./components/FeatMoviesList.jsx"
import MoviePage from "./components/MoviesPage.jsx"
import NotFound from "./components/NotFound.jsx"
import Profile from "./components/Profile.jsx"
import RentPage from "./components/RentPage.jsx"
import Login from "./components/Login.jsx"
import MyRentals from './components/MyRentals.jsx';

function App() {
  const location = useLocation();
  return (
    <div className="app-container">

       {location.pathname !== '/' && <Navbar />} 
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/searchmovies" element={<MoviePage/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rentals" element={<MyRentals />} />
        <Route path="/req" element={<RentPage />} />
        <Route path="/" element={<Login />} />
      </Routes>
      
    
   
    </div>

  )
}

export default App
