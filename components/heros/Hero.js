import HeroImage from 'components/heros/HeroImage';
import Slideshow from 'components/heros/Slideshow';
import Carousel from 'components/heros/Carousel';

const Hero = ({ pic, slideshow, picSize = 'small' }) => {
  const renderCarousel = () => {
    const slides = slideshow?.slides || null;
    const type = slideshow?.layout;
    const images = slides.map((slide) => slide.image.url);
    if (type === 'motion') {
      return <Carousel images={images} key={slideshow.id} />;
    }
    return <Slideshow slides={slides} key={slideshow.id} />;
  };

  return (
    <>
      {pic ? (
        <HeroImage pic={pic} small={picSize === 'small'} />
      ) : slideshow?.slides ? (
        renderCarousel(slideshow)
      ) : null}
    </>
  );
};
export default Hero;
