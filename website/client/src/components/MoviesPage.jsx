import Movie from "./Movie.jsx"
import {useState} from "react"





const movies = [
    { id: 'tt0111161', genre: "drama", title: 'The Shawshank Redemption', director: "Frank Darabont", year: 1994, price: 14.99, rating: 9.3, img: 'https://tinyurl.com/2p9jtrpp' },
    { id: 'tt0068646', genre: "crime", title: 'The Godfather', director: "Francis Ford Coppola", year: 1972, price: 16.99, rating: 9.2, img: 'https://tinyurl.com/3yypb7c4' },
    { id: 'tt0468569', genre: "action", title: 'The Dark Knight', director: "Christopher Nolan", year: 2008, price: 13.99, rating: 9.0, img: 'https://tinyurl.com/2ea8bb6h' },
    { id: 'tt0137523', genre: "drama", title: 'Fight Club', director: "David Fincher", year: 1999, price: 12.99, rating: 8.8, img: 'https://tinyurl.com/yt7u37wf' },
    { id: 'tt0109830', genre: "comedy", title: 'Forrest Gump', director: "Robert Zemeckis", year: 1994, price: 11.99, rating: 8.8, img: 'https://tinyurl.com/5n6vffzy' },
    { id: 'tt0120737', genre: "fantasy", title: 'The Lord of the Rings: The Fellowship of the Ring', director: "Peter Jackson", year: 2001, price: 15.99, rating: 8.8, img: 'https://tinyurl.com/5ha7s4fu' },
    { id: 'tt0080684', genre: "sci-fi", title: 'Star Wars: Episode V - The Empire Strikes Back', director: "Irvin Kershner", year: 1980, price: 14.49, rating: 8.7, img: 'https://tinyurl.com/3cbw72dj' },
    { id: 'tt1853728', genre: "western", title: 'Django Unchained', director: "Quentin Tarantino", year: 2012, price: 13.49, rating: 8.4, img: 'https://tinyurl.com/mvwym52h' },
    { id: 'tt0167260', genre: "fantasy", title: 'The Lord of the Rings: The Return of the King', director: "Peter Jackson", year: 2003, price: 15.49, rating: 9.0, img: 'https://tinyurl.com/mwczhtra' },
    { id: 'tt7286456', genre: "crime", title: 'Joker', director: "Todd Phillips", year: 2019, price: 17.99, rating: 8.4, img: 'https://tinyurl.com/54rv6ade' },
    { id: 'tt1375666', genre: "sci-fi", title: 'Inception', director: "Christopher Nolan", year: 2010, price: 14.99, rating: 8.8, img: 'https://tinyurl.com/yc37m33j' },
    { id: 'tt0133093', genre: "sci-fi", title: 'The Matrix', director: "Lana Wachowski, Lilly Wachowski", year: 1999, price: 12.49, rating: 8.7, img: 'https://tinyurl.com/5fcytauw' },
    { id: 'tt0816692', genre: "sci-fi", title: 'Interstellar', director: "Christopher Nolan", year: 2014, price: 15.99, rating: 8.6, img: 'https://tinyurl.com/233573db' },
    { id: 'tt3783958', genre: "comedy", title: 'La La Land', director: "Damian Chazelle", year: 2016, price: 10.99, rating: 8.0, img: 'https://tinyurl.com/a3b7kj5v' },
    { id: 'tt0114369', genre: "crime", title: 'Se7en', director: "David Fincher", year: 1995, price: 13.99, rating: 8.6, img: 'https://tinyurl.com/ybn6zwxb' },
    { id: 'tt0110413', genre: "romance", title: 'Léon: The Professional', director: "Luc Besson", year: 1994, price: 9.99, rating: 8.5, img: 'https://tinyurl.com/yk4yh76y' },
    { id: 'tt0120586', genre: "action", title: 'American History X', director: "Tony Kaye", year: 1998, price: 11.99, rating: 8.5, img: 'https://tinyurl.com/yj4r4xhd' },
    { id: 'tt0088763', genre: "adventure", title: 'Back to the Future', director: "Robert Zemeckis", year: 1985, price: 10.49, rating: 8.5, img: 'https://tinyurl.com/3kt3a4vp' }
  ];
  const styles = {
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    movieItem: {
      margin: '20px',
    },
  };
  
  const MoviePage = () => {
    const [filteredResults, setFilteredResults] = useState(movies); // Use movies array initially
    const [searchInput, setSearchInput] = useState("");
  
    // Function to handle searching
    const searchItems = (searchValue) => {
      setSearchInput(searchValue);
      if (searchValue !== "") {
        const filteredData = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(filteredData); // Update filtered results based on the search
      } else {
        setFilteredResults(movies); 
      }
    };
  

    const renderMovieRow = (movieList) => (
      <div style={{ marginBottom: '30px' }}>
        <div style={styles.grid}>
          {movieList.map((movie) => (
            <div key={movie.id} style={styles.movieItem}>
              <Movie title={movie.title} image={movie.img} />
            </div>
          ))}
        </div>
      </div>
    );
  
    return (
      <div>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)} 
          value={searchInput}
          style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
        />
  
        {renderMovieRow(filteredResults.slice(0, 6))} 
        {renderMovieRow(filteredResults.slice(6, 12))} 
        {renderMovieRow(filteredResults.slice(12, 18))} 
      </div>
    );
  };
  

  export default MoviePage;