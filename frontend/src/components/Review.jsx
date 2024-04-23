import React from "react";
import reviews from "../utils/review";

const Review = () => {
  return (
    <div className="reviews">
      {reviews.map((item, index) => (
        <div className="rev" key={index}>
          <img className="rev-img" src={item.photo} alt="photo" />
          <div className="rev-content">
            <div className="rev-name">{item.name}</div>
            <div className="rev-message">{item.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
