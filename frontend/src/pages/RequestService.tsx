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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createService({
        service_type: serviceType,
        description,
        requested_date: requestedDate,
        requested_time_window: requestedTimeWindow,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Unable to submit request.");
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Service Type</label>

            <select
              className="form-select"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
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
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>

            <textarea
              className="form-control"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Preferred Date</label>

            <input
              type="date"
              className="form-control"
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Preferred Time Window</label>

            <select
              className="form-select"
              value={requestedTimeWindow}
              onChange={(e) => setRequestedTimeWindow(e.target.value)}
              required
            >
              <option value={""} disabled hidden>
                Select a time window...
              </option>
              <option value={"morning"}>Morning 8:00 AM – 12:00 PM</option>
              <option value={"afternoon"}>Afternoon 12:00 PM – 4:00 PM</option>
              <option value={"evening"}>Evening 4:00 PM – 7:00 PM</option>
            </select>
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
