import React from 'react';
import Slideshow from 'components/Slideshow';

const Carousel = ({ data }) => {
  const slides = [
    {
      title: 'Drone Footage, Golden Gate',
      id: '38182260',
      image: {
        id: '15590324',
        alt: null,
        author: null,
        title: null,
        tags: [],
        url:
          'https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg?auto=format&max-w=1200&q=80',
        responsiveImage: {
          aspectRatio: 1.5544303797468355,
          base64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoIDwgSDg0XDg0QDg0NFhYNDQsNFx8lGCITFiEaKysjHR0oHRYWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHBAQHDsoIig7OzU7Ozs7Ly87LzsvLy8vOy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIAA8AGAMBIgACEQEDEQH/xAAYAAEAAwEAAAAAAAAAAAAAAAAFAQQGAP/EABsQAAICAwEAAAAAAAAAAAAAAAABAgQDERJB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwIB/8QAHBEAAAYDAAAAAAAAAAAAAAAAAAECAxESEyFB/9oADAMBAAIRAxEAPwDP1a6mxTHzXQRWscFmdh5Fos1qtAQmGcM9DWC9GS1s4GwNw9INUopANtlXY//Z',
          height: 1975,
          sizes: '(max-width: 3070px) 100vw, 3070px',
          src:
            'https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg',
          srcSet:
            'https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg?dpr=0.25 767w,https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg?dpr=0.5 1535w,https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg?dpr=0.75 2302w,https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg 3070w',
          webpSrcSet:
            'https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg?dpr=0.25&fm=webp 767w,https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg?dpr=0.5&fm=webp 1535w,https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg?dpr=0.75&fm=webp 2302w,https://www.datocms-assets.com/47575/1620570764-denys-nevozhai-rrnbmipmtzy-unsplash.jpg?fm=webp 3070w',
          width: 3070,
          alt: null,
          title: null
        }
      }
    },
    {
      title: 'Drone exploring, from above',
      id: '38182261',
      image: {
        id: '15590325',
        alt: null,
        author: null,
        title: null,
        tags: [],
        url:
          'https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg?auto=format&max-w=1200&q=80',
        responsiveImage: {
          aspectRatio: 0.749498997995992,
          base64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoIFAgLChILDhgQDhUYDh0VFhEkKB8gGiIfIhwoKywoJiA0HSMiJDUxKC4vNT4yHiZQPTcyQisxPjkBCgsLDg0OHBAQHDslHigvLy8vLy87LzUvNS8vLy8vLy8vNS8vLzU1Ly8vNS8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABgAEgMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAABQcGCAH/xAAjEAABAwMEAgMAAAAAAAAAAAACAAEEAwURBiIxcSFREhMU/8QAGAEAAgMAAAAAAAAAAAAAAAAAAwQBAgX/xAAbEQADAAIDAAAAAAAAAAAAAAAAAQMSEwIEEf/aAAwDAQACEQMRAD8AZVNPmA4w6yGqdGVpFP7hyxBx6dXGTDp+mSm6wKTxS2twolJIverZzSVluIk7fmLw+EKunb6PzLa3KE5q4gMyk1peUqu8zEUul6hKzYPsvxGEOdvLtCEJjJmfs5H/2Q==',
          height: 3992,
          sizes: '(max-width: 2992px) 100vw, 2992px',
          src:
            'https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg',
          srcSet:
            'https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg?dpr=0.25 748w,https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg?dpr=0.5 1496w,https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg?dpr=0.75 2244w,https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg 2992w',
          webpSrcSet:
            'https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg?dpr=0.25&fm=webp 748w,https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg?dpr=0.5&fm=webp 1496w,https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg?dpr=0.75&fm=webp 2244w,https://www.datocms-assets.com/47575/1620570772-erik-odiin-lsqljcvr0pc-unsplash.jpg?fm=webp 2992w',
          width: 2992,
          alt: null,
          title: null
        }
      }
    },
    {
      title: 'Drone Footage, City',
      id: '38182229',
      image: {
        id: '15590326',
        alt: null,
        author: null,
        title: null,
        tags: [],
        url:
          'https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg?auto=format&max-w=1200&q=80',
        responsiveImage: {
          aspectRatio: 0.8000807754442649,
          base64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgLBgoUCAsVDg4NDQ8HCA0GDREODQcNFx8ZGBYVIhUaHysjGh0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHRAPHC8dIiIvLy8vLy8vLy8vLy8vLy8vLy8vLy81Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABgAEwMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAAAgEEBf/EABsQAAIDAAMAAAAAAAAAAAAAAAABAwQSAhEi/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgEA/8QAGREBAQADAQAAAAAAAAAAAAAAAQACERMS/9oADAMBAAIRAxEAPwBo4mLZieS5HkSz1kLlptjgJYfKF6YFp57ZBerHkVmKwxbM7wSAkN0MnVk8rPpkgBfJb03/2Q==',
          height: 2476,
          sizes: '(max-width: 1981px) 100vw, 1981px',
          src:
            'https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg',
          srcSet:
            'https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg?dpr=0.25 495w,https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg?dpr=0.5 990w,https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg?dpr=0.75 1485w,https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg 1981w',
          webpSrcSet:
            'https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg?dpr=0.25&fm=webp 495w,https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg?dpr=0.5&fm=webp 990w,https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg?dpr=0.75&fm=webp 1485w,https://www.datocms-assets.com/47575/1620570780-fahrul-azmi-xzc4f2xzc84-unsplash.jpg?fm=webp 1981w',
          width: 1981,
          alt: null,
          title: null
        }
      }
    },
    {
      title: 'Drone footage, winter forest',
      id: '38182266',
      image: {
        id: '15590321',
        alt: null,
        author: null,
        title: null,
        tags: [],
        url:
          'https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg?auto=format&max-w=1200&q=80',
        responsiveImage: {
          aspectRatio: 1.719321731369924,
          base64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoIDQgLDQ0PDhEQDQ4NDh0NFg0NFxUZGCITFhUmKysjGikoHRUiJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHRAQHDUoIhwvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIAA4AGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAEBQABBv/EAB4QAAEDBAMAAAAAAAAAAAAAAAEAAgMEBhEyBRJS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwH/xAAYEQEBAAMAAAAAAAAAAAAAAAABAAIRMf/aAAwDAQACEQMRAD8AfVHEtnbjKBZa8bZe2UqhuyZx0KKFzzeCmRI8UeWkpOHaxoGVEnp7jmI1KtTTRQv/2Q==',
          height: 2241,
          sizes: '(max-width: 3853px) 100vw, 3853px',
          src:
            'https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg',
          srcSet:
            'https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg?dpr=0.25 963w,https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg?dpr=0.5 1926w,https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg?dpr=0.75 2889w,https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg 3853w',
          webpSrcSet:
            'https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg?dpr=0.25&fm=webp 963w,https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg?dpr=0.5&fm=webp 1926w,https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg?dpr=0.75&fm=webp 2889w,https://www.datocms-assets.com/47575/1620570737-kimon-maritz-1-isiwubmiw-unsplash.jpg?fm=webp 3853w',
          width: 3853,
          alt: null,
          title: null
        }
      }
    }
  ];

  return (
    <div>
      <Slideshow slides={slides} />
    </div>
  );
};

export default Carousel;
