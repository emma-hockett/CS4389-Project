import { useState, useEffect } from 'react';

const carouselItems = [
  {
    img: 'https://tinyurl.com/34u8mnth',
  
  },
  {
    img: 'https://tinyurl.com/mt4ra3yc',

  },
  {
    img: 'https://tinyurl.com/yyrrrsh4',

  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000); // change slides every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.carouselItem}>
        <img
          src={carouselItems[currentIndex].img}
          alt={carouselItems[currentIndex].caption}
          style={styles.carouselImage}
        />
        {/* <div style={styles.caption}>{carouselItems[currentIndex].caption}</div> */}
      </div>
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    marginTop: '20px',
  },
  carouselItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  caption: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    fontSize: '24px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px 20px',
    borderRadius: '10px',
  },
};

export default Carousel;
