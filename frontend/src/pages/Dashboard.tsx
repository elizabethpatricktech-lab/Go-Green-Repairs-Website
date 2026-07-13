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
    price: string | null;
    requested_date: string;
  }

  const [services, setServices] = useState<Service[]>([]);

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

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadServices();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <h2 className="mb-1">Welcome back!</h2>

      <p className="text-muted mb-4">
        Here are your current and past services.
      </p>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h6>Pending</h6>
              <h3>2</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h6>Confirmed</h6>
              <h3>1</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h6>Completed</h6>
              <h3>15</h3>
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
        {services.map((service) => (
          <div key={service.id} className="mb-3 p-3 border rounded">
            <h5>{service.service_type}</h5>

            <p className="mb-1">Requested: {service.requested_date}</p>

            <p className="mb-2">Price: {service.price ?? "TBD"}</p>

            <span className={`badge bg-${getStatusColor(service.status)}`}>
              {service.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
