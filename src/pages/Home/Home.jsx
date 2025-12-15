import React from "react";
import Banner from "./banner/Banner";
import SortSlider from "./sortSlider/SortSlider";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="py-10">
        <SortSlider></SortSlider>
      </div>
    </div>
  );
};

export default Home;
