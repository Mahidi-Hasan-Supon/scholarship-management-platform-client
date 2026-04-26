import React from "react";
import "animate.css";
const FAQ = () => {
  const faqs = [
    { q: "How to apply?", a: "Browse view details and click apply." },
    { q: "Is login required?", a: "Yes, login is required to apply." },
    { q: "Is payment refundable?", a: "No, payment is non-refundable." },
  ];

  return (
    <section className="py-20 ">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4 px-6 ">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="bg-linear-to-r from-[#8ecf35] to-[#23cc88] rounded-xl p-4 animate__animated    animate__bounceIn hover:shadow-2xl hover:underline"
          >
            <h4 className="font-semibold">{f.q}</h4>
            <p className="text-gray-600 mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
