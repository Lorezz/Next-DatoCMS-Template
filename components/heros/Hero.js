import HeroImage from 'components/heros/HeroImage';
import Slideshow from 'components/heros/Slideshow';
import Carousel from 'components/heros/Carousel';

const Hero = ({ pic, slideshow, picSize = 'small' }) => {
  if (!pic && !slideshow) return null;

  const renderCarousel = () => {
    const slides = slideshow?.slides || null;
    const layout = slideshow?.layout || 'swiper';
    const images = slides.map((slide) => slide.image.url);
    if (layout === 'motion') {
      return <Carousel images={images} key={slideshow.id} />;
    }
    return <Slideshow slides={slides} key={slideshow.id} />;
  };

  return (
    <>
      {slideshow?.slides && renderCarousel(slideshow)}
      {pic && <HeroImage pic={pic} small={picSize === 'small'} />}
    </>
  );
};
export default Hero;
