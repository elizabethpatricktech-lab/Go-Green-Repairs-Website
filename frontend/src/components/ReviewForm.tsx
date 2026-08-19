import { useState } from "react";
import { createReview } from "../services/reviewService";

interface ReviewFormProps {
  serviceId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const ReviewForm = ({ serviceId, onSuccess, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!comment.trim()) {
      setError("Please write a review before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      await createReview({
        service: serviceId,
        rating,
        comment: comment.trim(),
      });

      onSuccess();
    } catch (error: any) {
      console.error(error);

      const serviceError = error.response?.data?.service;

      if (serviceError) {
        setError(Array.isArray(serviceError) ? serviceError[0] : serviceError);
      } else {
        setError("Unable to submit your review.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card border-0 bg-light mt-3">
      <div className="card-body">
        <h5 className="mb-3">Leave a Review</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Rating</label>

          <div className="d-flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`btn ${
                  value <= rating ? "btn-warning" : "btn-outline-secondary"
                }`}
                onClick={() => setRating(value)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Your Review</label>

          <textarea
            className="form-control"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            required
          />
        </div>

        <div className="d-flex gap-2 justify-content-end">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-success"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
