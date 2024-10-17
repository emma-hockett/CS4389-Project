/* eslint-disable react/prop-types */

import './Movie.css'; 

const Movie = ({ title, image }) => {
  return (
    <div className="movie-container">
      <img className="movie-image" src={image} alt={title} />
      <h3 className="movie-title">{title}</h3>
    </div>
  );
};

export default Movie;
