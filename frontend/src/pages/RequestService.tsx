import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "../services/serviceService";

const RequestService = () => {
  const navigate = useNavigate();

  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [requestedDate, setRequestedDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createService({
        service_type: serviceType,
        description,
        requested_date: requestedDate,
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
            >
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
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Preferred Date</label>

            <input
              type="date"
              className="form-control"
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
            />
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
