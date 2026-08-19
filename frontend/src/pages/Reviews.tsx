import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews/`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Failed to load reviews:", error));
  }, []);

  return (
    <div>
      <section id="reviews">
        <div className="container text-center">
          <h1>What Our Customers Say</h1>
          <h5>Trusted by homeowners and businesses</h5>

          {reviews.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
                {reviews.slice(0, 6).map((review: any) => (
                  <div className="col" key={review.id}>
                    <div className="card p-3 review-card h-100">
                      <div className="text-center">
                        {"⭐".repeat(review.rating)}
                      </div>

                      <p className="text-center mt-2">{review.comment}</p>

                      <small className="text-center d-block mt-auto">
                        - {review.username}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <a href="/more-reviews">See More Reviews →</a>

                <small className="mx-2">Or</small>

                <a href="redacted" target="_blank" rel="noopener noreferrer">
                  See Google Reviews →
                </a>
              </div>
            </>
          ) : (
            <div className="py-4">
              <p className="text-muted mb-3">
                We're currently collecting reviews from our customers.
              </p>

              <p className="mb-3">
                In the meantime, see what our customers are saying on Google.
              </p>

              <a
                href="https://www.google.com/search?q=go+green+repairs&oq=go+green+repairs&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMggIAxAAGBYYHjIICAQQABgWGB4yDQgFEAAYhgMYgAQYigUyBggGEEUYPTIGCAcQRRg90gEIMjgyNmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8&zx=1775433265225&lqi=ChBnbyBncmVlbiByZXBhaXJzSMGY-Pf4vICACFoeEAAQARACGAAYARgCIhBnbyBncmVlbiByZXBhaXJzeghOZXcgWW9ya5IBD2h2YWNfY29udHJhY3RvcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyNVdTVTlWYkdaVFZHUmFUVlZhZEZscVVrdFdNVkpLWXpKd1YySlhZeEFC4AEA-gEECAAQSA#lkt=LocalPoiReviews&rlimm=17436155052432592098"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success"
              >
                See Google Reviews →
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
