import React from "react";
import Banner from "./banner/Banner";
import SortSlider from "./sortSlider/SortSlider";
import SuccessStories from "./successStories/SuccessStories";
import Testimonails from "./testimonials/Testimonails";
import FAQ from "./FAQ/FAQ";

const Home = () => {
  return (
    <div>
    <div className="py-10">
        <Banner></Banner>
    </div>
      <div className="py-10">
        <SortSlider></SortSlider>
      </div>
      <div>
        <SuccessStories></SuccessStories>
      </div>
      <div className="">
        <Testimonails></Testimonails>
      </div>
      <div>
        <FAQ></FAQ>
      </div>
    </div>
  );
};

export default Home;
