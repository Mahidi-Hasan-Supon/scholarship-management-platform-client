import React from "react";
import "animate.css";
const Testimonails = () => {
  const testimonials = [
    {
      name: "John Doe",
      comment: "This platform made scholarship hunting easy!",
      rating: 5,
    },
    {
      name: "Sara Khan",
      comment: "Very helpful and user-friendly.",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 ">
      <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
      <div className="max-w-4xl mx-auto space-y-6 px-6 ">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-linear-to-r from-[#8ecf35] to-[#23cc88] p-6 rounded-xl animate__animated animate__zoomInDown hover:shadow-2xl hover:underline"
          >
            <p className="italic">“{t.comment}”</p>
            <div className="mt-2 flex justify-between">
              <span className="font-semibold">{t.name}</span>
              <span>⭐ {t.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonails;
