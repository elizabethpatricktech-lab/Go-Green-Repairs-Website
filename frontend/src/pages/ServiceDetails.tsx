import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getService } from "../services/serviceService";
import { Link } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();

  const [service, setService] = useState<any>(null);

  useEffect(() => {
    const loadService = async () => {
      if (!id) return;

      try {
        const data = await getService(Number(id));
        setService(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadService();
  }, [id]);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-success"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Link to="/dashboard" className="btn btn-outline-secondary mb-3">
        ← Back to Dashboard
      </Link>

      <div className="container mt-4">
        <h2>{service.service_type_display}</h2>

        <hr />

        <p>
          <strong>Status:</strong> {service.status_display}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{service.description}</p>

        <p>
          <strong>Requested Date:</strong> {service.requested_date}
        </p>

        <p>
          <strong>Requested Time Window:</strong>{" "}
          {service.requested_time_window_display}
        </p>

        <p>
          <strong>Scheduled Date:</strong>{" "}
          {service.scheduled_date || "Not scheduled"}
        </p>

        <p>
          <strong>Scheduled Time Window:</strong>{" "}
          {service.assigned_time_window_display || "Not scheduled"}
        </p>

        <p>
          <strong>Estimated Price:</strong>{" "}
          {service.price ?? "To Be Determined"}
        </p>

        <p>
          <strong>Admin Notes:</strong> {service.admin_notes || "No notes yet"}
        </p>
      </div>
    </>
  );
};

export default ServiceDetails;
