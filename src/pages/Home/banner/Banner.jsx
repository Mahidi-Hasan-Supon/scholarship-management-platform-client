// import React from "react";
// import { motion } from "framer-motion";
// const Banner = () => {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
//       <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-2xl"
//         >
//           <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
//             Find the Right Scholarship for Your Future
//           </h1>
//           <p className="mt-6 text-lg leading-8 text-indigo-100">
//             Discover local and international scholarships tailored to your
//             background, subject, and goals. Start your journey toward higher
//             education today.
//           </p>
//           <div className="mt-10 flex items-center gap-x-4">
//             <button className="rounded-2xl bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow hover:bg-indigo-50">
//               Search Scholarship
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Decorative blur */}
//       <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
//     </section>
//   );
// };

// export default Banner;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import scholarshipBanImg1 from "../../../assets/scholarship banner 6 people.webp";
import scholarshipBanImg2 from "../../../assets/Banner_Scholarships_8people.jpg";
import scholarshipBanImg3 from "../../../assets/scholarship banner female.jpg";
import scholarshipBanImg4 from "../../../assets/scholarship banner 5 pepole.jpg";

const Banner = () => {
  return (
    <div className="w-full py-10">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-[600px] bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
               ` url(${scholarshipBanImg1})`,
            }}
          >
            <div className=" text-white px-6">
              {/* <p className="uppercase tracking-widest mb-3">
                Welcome To Qeducato
              </p> */}

              <h1 className="text-5xl font-bold mb-4">
                Education is the best <br /> key success in life
              </h1>

              <p className="max-w-xl mb-6">
                Donec vitae libero non enim placerat eleifend aliquam erat
                volutpat.
              </p>

              <div className="flex gap-4">
                <button className="bg-orange-500 px-6 py-3 rounded">
                  Search Scholarship
                </button>

                {/* <button className="border px-6 py-3 rounded">Contact Us</button> */}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-[600px] w-full bg-cover bg-top flex items-center"
            style={{
              backgroundImage:
              ` url(${scholarshipBanImg2})`,
            }}
          >
            <div className=" text-white px-6">
              {/* <p className="uppercase tracking-widest mb-3">
                Welcome To Qeducato
              </p> */}

              <h1 className="text-5xl font-bold mb-4">
                Learn Today <br /> Lead Tomorrow
              </h1>

              <p className="max-w-xl mb-6">
                Curabitur diam ex, dapibus purus sapien, cursus sed nisl
                tristique.
              </p>

              <div className="flex gap-4">
                <button className="bg-orange-500 px-6 py-3 rounded">
                  Search Scholarship
                </button>

                {/* <button className="border px-6 py-3 rounded">Contact Us</button> */}
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-[600px] w-full bg-cover bg-top flex items-center"
            style={{
              backgroundImage:
              ` url(${scholarshipBanImg3})`,
            }}
          >
            <div className=" text-white px-6">
              {/* <p className="uppercase tracking-widest mb-3">
                Welcome To Qeducato
              </p> */}

              <h1 className="text-5xl font-bold mb-4">
                Learn Today <br /> Lead Tomorrow
              </h1>

              <p className="max-w-xl mb-6">
                Curabitur diam ex, dapibus purus sapien, cursus sed nisl
                tristique.
              </p>

              <div className="flex gap-4">
                <button className="bg-orange-500 px-6 py-3 rounded">
                  Search Scholarship
                </button>

                {/* <button className="border px-6 py-3 rounded">Contact Us</button> */}
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="h-[600px] w-full bg-cover bg-top flex items-center"
            style={{
              backgroundImage:
              ` url(${scholarshipBanImg4})`,
            }}
          >
            <div className=" text-white px-6">
              {/* <p className="uppercase tracking-widest mb-3">
                Welcome To Qeducato
              </p> */}

              <h1 className="text-5xl font-bold mb-4">
                Learn Today <br /> Lead Tomorrow
              </h1>

              <p className="max-w-xl mb-6">
                Curabitur diam ex, dapibus purus sapien, cursus sed nisl
                tristique.
              </p>

              <div className="flex gap-4">
                <button className="bg-orange-500 px-6 py-3 rounded">
                  Search Scholarship
                </button>

                {/* <button className="border px-6 py-3 rounded">Contact Us</button> */}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
