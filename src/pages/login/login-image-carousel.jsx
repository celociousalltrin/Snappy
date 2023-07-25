import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { loginCarouselImageDetails } from "../../utils/common";

import "./style.css";

const LoginImageCarousel = () => {
  const [selectedCarouselImageIndex, setCarouselImageIndex] = useState(0);

  return (
    <div>
      <Carousel
        onSelect={(index) => setCarouselImageIndex(index)}
        keyboard={true}
        touch={true}
        data-bs-theme="dark"
        controls={false}
      >
        {loginCarouselImageDetails.map((obj) => (
          <Carousel.Item key={obj.id} interval={3000}>
            <img
              src={obj.image}
              width="550px"
              height="400px"
              className="mt-5"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <p className="mt-4 text-center text-light fs-4 fw-bold">
        {loginCarouselImageDetails[selectedCarouselImageIndex].content}
      </p>
    </div>
  );
};

export default LoginImageCarousel;
