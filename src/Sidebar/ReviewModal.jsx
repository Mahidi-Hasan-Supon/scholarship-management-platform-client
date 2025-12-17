import { useState } from "react";

export const ReviewModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-3">Add Review</h2>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="select w-full mb-3"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
        <textarea
          className="textarea w-full"
          placeholder="Comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => onSubmit({ rating, comment })}
          >
            Submit
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
