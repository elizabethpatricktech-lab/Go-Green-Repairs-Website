import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ContactForm from "../components/Contact";

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
}

const MoreReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reviews.");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load reviews right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <Navbar />

      <main className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">What Our Customers Say</h1>

          <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
            See what our customers have to say about their experience with Go
            Green Repairs.
          </p>
        </div>

        {/* Reviews */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status"></div>
            <p className="text-muted mt-3">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="alert alert-info text-center">
            No customer reviews yet. Be the first to leave one!
          </div>
        ) : (
          <div className="row g-4">
            {reviews.map((review) => (
              <div key={review.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    {/* Name + Rating */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="mb-1 fw-semibold">{review.username}</h5>

                        <div
                          className="text-warning"
                          aria-label={`${review.rating} out of 5 stars`}
                        >
                          {"★".repeat(review.rating)}
                          <span className="text-muted ms-2 small">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-muted mb-0">"{review.comment}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Google Reviews */}
        <div className="text-center mt-5">
          <p className="text-muted mb-2">Want to see more?</p>

          <a
            href="https://www.google.com/search?q=go+green+repairs&oq=go+green+repairs&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMggIAxAAGBYYHjIICAQQABgWGB4yDQgFEAAYhgMYgAQYigUyBggGEEUYPTIGCAcQRRg90gEIMjgyNmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8&zx=1775433265225&lqi=ChBnbyBncmVlbiByZXBhaXJzSMGY-Pf4vICACFoeEAAQARACGAAYARgCIhBnbyBncmVlbiByZXBhaXJzeghOZXcgWW9ya5IBD2h2YWNfY29udHJhY3RvcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyNVdTVTlWYkdaVFZHUmFUVlZhZEZscVVrdFdNVkpLWXpKd1YySlhZeEFC4AEA-gEECAAQSA#lkt=LocalPoiReviews&rlimm=17436155052432592098"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-success"
          >
            See Our Google Reviews →
          </a>
        </div>
      </main>

      {/* Contact */}
      <ContactForm />
    </div>
  );
};

export default MoreReviews;
