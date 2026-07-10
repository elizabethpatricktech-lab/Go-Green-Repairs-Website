import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [services, setServices] = useState([]);

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
    fetch("http://127.0.0.1:8000/api/services/")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="container mt-4">
        <h2>My Services</h2>

        {services.map((service: any) => (
          <div key={service.id} className="mb-3 p-3 border rounded">
            <h5>{service.service_type}</h5>
            <span className={`badge bg-${getStatusColor(service.status)}`}>
              {service.status}
            </span>
            <p>Price: {service.price || "TBD"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
