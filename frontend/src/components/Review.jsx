import reviews from "../utils/review";

const Review = () => {
  return (
    <section className="reviews">
      <div className="reviews-head">
        <h2>What Clients Say</h2>
        <p>Real feedback from people who found their ideal property with us.</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((item, index) => (
          <article className="rev" key={index}>
            <img className="rev-img" src={item.photo} alt={item.name} />
            <div className="rev-content">
              <div className="rev-name">{item.name}</div>
              <div className="rev-message">{item.message}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Review;
