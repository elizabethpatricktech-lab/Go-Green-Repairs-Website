import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reviews/")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div>
      <section id="reviews">
        <div className="container text-center">
          <h1>What Our Customers Say</h1>
          <h5>Trusted by homeowners and businesses</h5>

          <div className="row row-cols-3">
            {reviews.slice(0, 6).map((review: any) => (
              <div className="col">
                <div className="col-md-2">
                  <div className="card p-3 review-card" key={review.id}>
                    <div className="text-center">
                      {"⭐".repeat(review.rating)}
                    </div>
                    <p className="text-center">{review.comment}</p>
                    <small className=" text-center d-block mt-2">
                      - {review.username}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a href="/more-reviews">See More Reviews {"->"}</a>
          <small> Or </small>
          <a
            href="https://www.google.com/search?q=go+green+repairs&oq=go+green+repairs&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMggIAxAAGBYYHjIICAQQABgWGB4yDQgFEAAYhgMYgAQYigUyBggGEEUYPTIGCAcQRRg90gEIMjgyNmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8&zx=1775433265225&lqi=ChBnbyBncmVlbiByZXBhaXJzSMGY-Pf4vICACFoeEAAQARACGAAYARgCIhBnbyBncmVlbiByZXBhaXJzeghOZXcgWW9ya5IBD2h2YWNfY29udHJhY3RvcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyNVdTVTlWYkdaVFZHUmFUVlZhZEZscVVrdFdNVkpLWXpKd1YySlhZeEFC4AEA-gEECAAQSA#lkt=LocalPoiReviews&rlimm=17436155052432592098"
            target="_blank"
          >
            See Google Reviews {"->"}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
