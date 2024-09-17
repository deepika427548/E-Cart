import React from "react";

const Carousel = () => {
  return  <div id="carouselExample" className="carousel slide mt-2">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img
        src="/images/c4.webp"
        className="d-block w-100 carousel-img"
        alt="..."
      />
    </div>
    <div className="carousel-item">
      <img
        src="/images/c5.jpg"
        className="d-block w-100 carousel-img"
        alt="..."
      />
    </div>
    <div className="carousel-item">
      <img
        src="/images/c6.jpg"
        className="d-block w-100 carousel-img"
        alt="..."
      />
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span
      className="carousel-control-prev-icon"
      aria-hidden="true"
    ></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span
      className="carousel-control-next-icon"
      aria-hidden="true"
    ></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
};

export default Carousel;
