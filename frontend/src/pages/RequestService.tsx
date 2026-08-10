import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "../services/serviceService";

const RequestService = () => {
  const navigate = useNavigate();

  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [requestedDate, setRequestedDate] = useState("");
  const [requestedTimeWindow, setRequestedTimeWindow] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setGeneralError("");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(requestedDate + "T00:00:00");

    if (selectedDate < today) {
      setErrors({
        requested_date: "Please select a future date.",
      });
      return;
    }

    try {
      await createService({
        service_type: serviceType,
        description,
        requested_date: requestedDate,
        requested_time_window: requestedTimeWindow,
      });

      navigate("/dashboard");
    } catch (error: any) {
      const data = error.response?.data;

      if (data) {
        const fieldErrors: Record<string, string> = {};

        Object.keys(data).forEach((field) => {
          if (Array.isArray(data[field])) {
            fieldErrors[field] = data[field][0];
          }
        });

        setErrors(fieldErrors);
      } else {
        setGeneralError("Unable to submit your request. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Request New Service</h2>

        <p className="text-muted">
          Fill out the information below and we'll review your request.
        </p>

        {generalError && (
          <div className="alert alert-danger">{generalError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Service Type</label>

            <select
              className={`form-select ${
                errors.service_type ? "is-invalid" : ""
              }`}
              value={serviceType}
              onChange={(e) => {
                setRequestedTimeWindow(e.target.value);

                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.requested_time_window;
                  return newErrors;
                });
              }}
              required
            >
              <option value={""} disabled hidden>
                Select a service...
              </option>
              <option value={"hvac_installation"}>HVAC Installation</option>
              <option value={"hvac_repair"}>HVAC Repair</option>
              <option value={"bakery_installation"}>
                Bakery Equipment Installation
              </option>
              <option value={"bakery_repair"}>Bakery Equipment Repair</option>
              <option value={"commerical_installation"}>
                Commercial Kitchen Installation
              </option>
              <option value={"commercial_repair"}>
                Commercial Kitchen Repair
              </option>
              <option value={"maintenance"}>Maintenance</option>
              <option value={"cleaning"}>Cleaning</option>
              <option value={"other"}>Other</option>
            </select>
            {errors.service_type && (
              <div className="invalid-feedback">{errors.service_type}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>

            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              rows={5}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);

                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.description;
                  return newErrors;
                });
              }}
              required
            ></textarea>

            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Preferred Date</label>

            <input
              type="date"
              className={`form-control ${
                errors.requested_date ? "is-invalid" : ""
              }`}
              value={requestedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setRequestedDate(e.target.value);

                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.requested_date;
                  return newErrors;
                });
              }}
              required
            />

            {errors.requested_date && (
              <div className="invalid-feedback">{errors.requested_date}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Preferred Time Window</label>

            <select
              className={`form-select ${
                errors.requested_time_window ? "is-invalid" : ""
              }`}
              value={requestedTimeWindow}
              onChange={(e) => {
                setRequestedTimeWindow(e.target.value);

                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.requested_time_window;
                  return newErrors;
                });
              }}
              required
            >
              <option value="" disabled hidden>
                Select a time window...
              </option>

              <option value="morning">Morning 8:00 AM – 12:00 PM</option>

              <option value="afternoon">Afternoon 12:00 PM – 4:00 PM</option>

              <option value="evening">Evening 4:00 PM – 7:00 PM</option>
            </select>

            {errors.requested_time_window && (
              <div className="invalid-feedback">
                {errors.requested_time_window}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-success">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestService;
