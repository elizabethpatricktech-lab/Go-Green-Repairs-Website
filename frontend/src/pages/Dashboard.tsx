import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { getServices } from "../services/serviceService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  interface Service {
    id: number;
    service_type: string;
    status: string;
    description: string;
    price: string | null;
    requested_date: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "primary";
      case "completed":
        return "success";
      case "rejected":
        return "danger";
      case "assessed":
        return "info";
      default:
        return "secondary";
    }
  };

  const statusSteps = [
    "pending",
    "confirmed",
    "assessed",
    "in_progress",
    "completed",
  ];

  const formatDate = (date: string | null) => {
    if (!date) return "Not scheduled yet";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number | null) => {
    if (price == null) return "To Be Determined";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.indexOf(status);
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load your services.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const pendingCount = services.filter(
    (service: any) => service.status === "pending",
  ).length;

  const confirmedCount = services.filter(
    (service: any) => service.status === "confirmed",
  ).length;

  const completedCount = services.filter(
    (service: any) => service.status === "completed",
  ).length;

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="container text-center mt-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-3">Loading your dashboard...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="container mt-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <h2 className="mb-1">Welcome back!</h2>

      <p className="text-muted mb-4">
        Here are your current and past services.
      </p>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-3 col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Pending</h6>
              <h2>{pendingCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Confirmed</h6>
              <h2>{confirmedCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Completed</h6>
              <h2>{completedCount}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">My Services</h2>

          <Link to="/request-service" className="btn btn-success">
            + Request New Service
          </Link>
        </div>

        {/* Services */}
        {services.length === 0 ? (
          <div className="alert alert-info">
            You haven't requested any services yet.
          </div>
        ) : (
          services.map((service: any) => (
            <div key={service.id} className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{service.service_type_display}</h5>

                  <span
                    className={`badge bg-${getStatusColor(service.status)}`}
                  >
                    {service.status_display}
                  </span>
                </div>

                <hr />

                {/* Description */}
                <div className="mb-4">
                  <h6>Description</h6>
                  <p className="text-muted mb-0">{service.description}</p>
                </div>

                {/* Service Details */}
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Requested Date</strong>
                      <br />
                      {formatDate(service.requested_date)}
                    </p>

                    <p>
                      <strong>Scheduled Date</strong>
                      <br />
                      {formatDate(service.scheduled_date) ||
                        "Not scheduled yet"}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Estimated Price</strong>
                      <br />
                      {formatPrice(service.price) ?? "To Be Determined"}
                    </p>

                    <p>
                      <strong>Admin Notes</strong>
                      <br />
                      {service.admin_notes || "No notes yet"}
                    </p>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Timeline / Status */}
                {service.status === "rejected" ? (
                  <div className="alert alert-danger">
                    This service request was rejected.
                  </div>
                ) : service.status === "rescheduled" ? (
                  <div className="alert alert-warning">
                    Your appointment has been rescheduled.
                    {service.scheduled_date && (
                      <div className="mt-2">
                        <strong>New Scheduled Date:</strong>{" "}
                        {service.scheduled_date}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h6 className="mb-3">Progress</h6>

                    {statusSteps.map((step, index) => {
                      const current = getStatusIndex(service.status);

                      let icon = "○";

                      if (index < current) icon = "✓";
                      if (index === current) icon = "●";

                      const labels: Record<string, string> = {
                        pending: "Request Submitted",
                        confirmed: "Confirmed",
                        assessed: "On-Site Assessment",
                        in_progress: "Work In Progress",
                        completed: "Completed",
                      };

                      return (
                        <div key={step} className="mb-2">
                          <span className="me-2">{icon}</span>
                          {labels[step]}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
