export const carouselImage = image => {
  return {
    minHeight: '35vh',
    width: 'auto',
    borderRadius: '3px',
    backgroundSize: 'cover',

    backgroundImage: `url(${image})`
  };
};

export const carouselOverlay = {
  zIndex: 10,
  background:
    'linear-gradient(to top, rgba(000,000,000,1),rgba(000,000,000,0))',
  color: '#ddd',
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: 'auto',
  padding: '0',
  borderBottomLeftRadius: '3px',
  borderBottomRightRadius: '3px'
};

export const carouselText = {
  padding: '1rem',
  fontSize: '0.8rem'
};
