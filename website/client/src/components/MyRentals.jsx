/* eslint-disable react/prop-types */

// Movies array
const movies = [
    { id: 'tt3783958', genre: "comedy", title: 'La La Land', director: "Damian Chazelle", year: 2016, price: 10.99, rating: 8.0, img: 'https://tinyurl.com/a3b7kj5v' },
    { id: 'tt0114369', genre: "crime", title: 'Se7en', director: "David Fincher", year: 1995, price: 13.99, rating: 8.6, img: 'https://tinyurl.com/ybn6zwxb' }
];



// MovieCard component
const MovieCard = ({ movie }) => {
    return (
        <div style={styles.card}>
            {/* Image Section */}
            <div style={styles.imageContainer}>
                <img src={movie.img} alt={`${movie.title} poster`} style={styles.image} />
            </div>
            
            {/* Text Section */}
            <div style={styles.detailsContainer}>
                <h3 style={styles.title}>{movie.title}</h3>
                <p style={styles.text}>Genre: {movie.genre}</p>
                <p style={styles.text}>Director: {movie.director}</p>
                <p style={styles.text}>Year: {movie.year}</p>
                <p style={styles.text}>Rating: {movie.rating}</p>
                <p style={styles.text}>Due on December 31, 2024</p>
            </div>
        </div>
    );
};

// Main component to render all movie cards
const MyRentals = () => {
    return (
        <>
        <h1>My Rentals </h1>
        <div style={styles.container}>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
        
        </>
     
    );
};


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        width: '600px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    imageContainer: {
        flex: '1 1 33%',
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    detailsContainer: {
        flex: '1 1 67%',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '1.5em',
        margin: '0 0 10px',
    },
    text: {
        margin: '4px 0',
    },
};

export default MyRentals;
