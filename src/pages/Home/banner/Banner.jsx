import React from "react";
import { motion } from "framer-motion";
const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Find the Right Scholarship for Your Future
          </h1>
          <p className="mt-6 text-lg leading-8 text-indigo-100">
            Discover local and international scholarships tailored to your
            background, subject, and goals. Start your journey toward higher
            education today.
          </p>
          <div className="mt-10 flex items-center gap-x-4">
            <button className="rounded-2xl bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow hover:bg-indigo-50">
              Search Scholarship
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative blur */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
    </section>
  );
};

export default Banner;
