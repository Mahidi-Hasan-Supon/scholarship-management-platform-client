import React from "react";

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
    <section className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
      <div className="max-w-4xl mx-auto space-y-6 px-6">
        {testimonials.map((t, i) => (
          <div key={i} className="border p-6 rounded-xl">
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
