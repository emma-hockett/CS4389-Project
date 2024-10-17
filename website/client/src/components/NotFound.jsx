import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px',
  },
  header: {
    fontSize: '100px',
    margin: '0',
    color: '#ff6b6b',
  },
  message: {
    fontSize: '24px',
    margin: '10px 0 20px',
    color: '#555',
  },
  link: {
    textDecoration: 'none',
    color: '#4a90e2',
    fontSize: '18px',
    border: '1px solid #4a90e2',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'all 0.3s',
  },
};

export default NotFound;
