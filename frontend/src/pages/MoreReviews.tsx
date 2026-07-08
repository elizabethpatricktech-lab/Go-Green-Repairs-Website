import Navbar from "../components/Navbar";
import ContactForm from "../components/Contact";
import { useEffect, useState } from "react";

const MoreReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reviews/")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <h2 className="mb-4">Customer Reviews</h2>
      {reviews.map((review: any) => (
        <div key={review.id} className="review-item">
          {/* Name + Stars together */}
          <strong>{review.username}</strong>
          <div className="text-warning small">{"⭐".repeat(review.rating)}</div>

          {/* Comment */}
          <p className="mt-2">{review.comment}</p>

          <hr />
        </div>
      ))}

      <div className="text-center">
        <a
          href="https://www.google.com/search?q=go+green+repairs&oq=go+green+repairs&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMggIAxAAGBYYHjIICAQQABgWGB4yDQgFEAAYhgMYgAQYigUyBggGEEUYPTIGCAcQRRg90gEIMjgyNmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8&zx=1775433265225&lqi=ChBnbyBncmVlbiByZXBhaXJzSMGY-Pf4vICACFoeEAAQARACGAAYARgCIhBnbyBncmVlbiByZXBhaXJzeghOZXcgWW9ya5IBD2h2YWNfY29udHJhY3RvcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyNVdTVTlWYkdaVFZHUmFUVlZhZEZscVVrdFdNVkpLWXpKd1YySlhZeEFC4AEA-gEECAAQSA#lkt=LocalPoiReviews&rlimm=17436155052432592098"
          target="_blank"
        >
          See Google Reviews {"->"}
        </a>
      </div>
      <ContactForm></ContactForm>
    </div>
  );
};

export default MoreReviews;
