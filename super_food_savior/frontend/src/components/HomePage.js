import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";

export default class HomePage extends Component {
  render() {
    return (
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        stopOnHover={false}
      >
        <div>
          <img src={require("./assets/picture1.jpg")} alt="" />
        </div>
        <div>
          <img src={require("./assets/picture2.jpg")} alt="" />
        </div>
        <div>
          <img src={require("./assets/picture3.png")} alt="" />
        </div>
      </Carousel>
    );
  }
}
