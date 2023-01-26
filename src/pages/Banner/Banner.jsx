import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './banner.scss';

export default function Banner() {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-cont">
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src={require("./img/Dragon_Render_Desktop.jpg")}
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>Space X</h1>
          <h3>Capsules</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src={require("./img/Trunk_Render_Desktop.jpg")}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h1>Space X</h1>
          <h3>Capsules</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={require("./img/DragonTrunk_Render_Desktop.jpg")}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h1>Space X</h1>
          <h3>Capsules</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
