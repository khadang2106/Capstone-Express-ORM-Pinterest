import React from 'react';
import './Carousel.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    pauseOnHover: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel">
      <h1>Get your next</h1>
      <Slider {...settings}>
        <div className="carousel-item dinner">
          <h2>weeknight dinner idea</h2>
          <div className="carousel-img">
            <img
              className="high-pic"
              src={process.env.PUBLIC_URL + '/imgs/dinner1.jpg'}
              alt=""
            />
            <img
              className="mid-pic"
              src={process.env.PUBLIC_URL + '/imgs/dinner2.jpg'}
              alt=""
            />
            <img
              className="low-pic"
              src={process.env.PUBLIC_URL + '/imgs/dinner3.jpg'}
              alt=""
            />
            <img
              className="lowest-pic"
              src={process.env.PUBLIC_URL + '/imgs/dinner7.jpg'}
              alt=""
            />
            <img
              className="low-pic"
              src={process.env.PUBLIC_URL + '/imgs/dinner5.jpg'}
              alt=""
            />
            <img
              className="mid-pic"
              src={process.env.PUBLIC_URL + '/imgs/dinner6.jpg'}
              alt=""
            />
            <img
              className="high-pic"
              src={process.env.PUBLIC_URL + '/imgs/dinner4.jpg'}
              alt=""
            />
          </div>
        </div>
        <div className="carousel-item decor">
          <h2>home decor idea</h2>
          <div className="carousel-img">
            <img
              className="high-pic"
              src={process.env.PUBLIC_URL + '/imgs/decor1.jpg'}
              alt=""
            />
            <img
              className="mid-pic"
              src={process.env.PUBLIC_URL + '/imgs/decor2.jpg'}
              alt=""
            />
            <img
              className="low-pic"
              src={process.env.PUBLIC_URL + '/imgs/decor3.jpg'}
              alt=""
            />
            <img
              className="lowest-pic"
              src={process.env.PUBLIC_URL + '/imgs/decor7.jpg'}
              alt=""
            />
            <img
              className="low-pic"
              src={process.env.PUBLIC_URL + '/imgs/decor5.jpg'}
              alt=""
            />
            <img
              className="mid-pic"
              src={process.env.PUBLIC_URL + '/imgs/decor6.jpg'}
              alt=""
            />
            <img
              className="high-pic"
              src={process.env.PUBLIC_URL + '/imgs/decor4.jpg'}
              alt=""
            />
          </div>
        </div>
        <div className="carousel-item outfit">
          <h2>new look outfit</h2>
          <div className="carousel-img">
            <img
              className="high-pic"
              src={process.env.PUBLIC_URL + '/imgs/outfit1.jpg'}
              alt=""
            />
            <img
              className="mid-pic"
              src={process.env.PUBLIC_URL + '/imgs/outfit2.jpg'}
              alt=""
            />
            <img
              className="low-pic"
              src={process.env.PUBLIC_URL + '/imgs/outfit3.jpg'}
              alt=""
            />
            <img
              className="lowest-pic"
              src={process.env.PUBLIC_URL + '/imgs/outfit7.jpg'}
              alt=""
            />
            <img
              className="low-pic"
              src={process.env.PUBLIC_URL + '/imgs/outfit5.jpg'}
              alt=""
            />
            <img
              className="mid-pic"
              src={process.env.PUBLIC_URL + '/imgs/outfit6.jpg'}
              alt=""
            />
            <img
              className="high-pic"
              src={process.env.PUBLIC_URL + '/imgs/outfit4.jpg'}
              alt=""
            />
          </div>
        </div>
        <div className="carousel-item green">
          <h2>green thumb idea</h2>
          <div className="carousel-img">
            <img
              className="high-pic"
              src={process.env.PUBLIC_URL + '/imgs/green1.jpg'}
              alt=""
            />
            <img
              className="mid-pic"
              src={process.env.PUBLIC_URL + '/imgs/green2.jpg'}
              alt=""
            />
            <img
              className="low-pic"
              src={process.env.PUBLIC_URL + '/imgs/green3.jpg'}
              alt=""
            />
            <img
              className="lowest-pic"
              src={process.env.PUBLIC_URL + '/imgs/green7.jpg'}
              alt=""
            />
            <img
              className="low-pic"
              src={process.env.PUBLIC_URL + '/imgs/green5.jpg'}
              alt=""
            />
            <img
              className="mid-pic"
              src={process.env.PUBLIC_URL + '/imgs/green6.jpg'}
              alt=""
            />
            <img
              className="high-pic"
              src={process.env.PUBLIC_URL + '/imgs/green4.jpg'}
              alt=""
            />
          </div>
        </div>
      </Slider>
      <div className="carousel-overlay"></div>
    </div>
  );
}
