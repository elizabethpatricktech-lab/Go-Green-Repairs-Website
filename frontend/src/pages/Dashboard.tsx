import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { getServices } from "../services/serviceService";

const Dashboard = () => {
  interface Service {
    id: number;
    service_type: string;
    status: string;
    price: string | null;
    date: string;
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
      <div className="container mt-4">
        <h2>My Services</h2>

        {services.map((service) => (
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
