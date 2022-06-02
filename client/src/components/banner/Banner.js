import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div class="container mt-5 mb-4">
      <div class="card bg-light text-white">
        <img src="banner.png" class="my_banner" alt="Card image" />

        <div class="card-img-overlay">
          <div class="card-title text1_on_banner">
            Explore the Products that Fulfill Your Needs
          </div>

          <div class="card-text text2_on_banner">
            Pay through Crypto
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
