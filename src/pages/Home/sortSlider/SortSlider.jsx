import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

import abcImg from "../../../assets/ABC-logo_60.webp";
import chicagoImg from "../../../assets/Chicago_Tribune_Logo_60.webp";
import moneyImg from "../../../assets/money-magazine_60.webp";
import msnImg from "../../../assets/msn_60.webp";
import nbcImg from "../../../assets/nbc-logo_60.webp";
import newyorkImg from "../../../assets/The_New_York_Times_60.webp";
import usaImg from "../../../assets/USA_Today_60.webp";
import wallImg from "../../../assets/WallStreetJournal_60.webp";
import washigtonImg from "../../../assets/Washington_Post_60.webp";
import yahooImg from "../../../assets/yahoo-finance_60.webp";

const sortSlider = [
  abcImg,
  chicagoImg,
  moneyImg,
  msnImg,
  nbcImg,
  newyorkImg,
  usaImg,
  wallImg,
  washigtonImg,
  yahooImg,
];
const SortSlider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
          autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination , Autoplay]}
        className="mySwiper"
      >
        {
            sortSlider.map(sort=>
                <SwiperSlide>
                    <img src={sort} alt="" />
                </SwiperSlide>
            )
        }
        
      
      </Swiper>
    </div>
  );
};

export default SortSlider;
