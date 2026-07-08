import { useState } from "react";

// Import your images
import AcIcon from "/Images/Services-imgs/mini-split.png";
import ToolsIcon from "/Images/Services-imgs/handyman.png";
import MaintenanceIcon from "/Images/Services-imgs/cleaning.png";
import OvenIcon from "/Images/Services-imgs/fridge.png";
import DrillIcon from "/Images/Services-imgs/drill.png";
import ToolboxIcon from "/Images/Services-imgs/toolbox.png";

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<"HVAC" | "CB">("HVAC");

  const handleServiceClick = (service: "HVAC" | "CB") => {
    setActiveService(service);
  };

  return (
    <div>
      <section id="services" className="py-5">
        <div className="container text-center">
          <h1 className="mb-5">Our Services</h1>
          {/* Service Toggle */}
          <div className="d-flex justify-content-center mb-4 gap-3">
            <p
              id="HVAC-service"
              className={`service-type px-3 py-2 ${
                activeService === "HVAC" ? "bg-success text-white rounded" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleServiceClick("HVAC")}
            >
              HVAC
            </p>
            <h2>/</h2>
            <p
              id="CB-service"
              className={`service-type px-3 py-2 ${
                activeService === "CB" ? "bg-success text-white rounded" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleServiceClick("CB")}
            >
              Commercial Kitchen and Bakery
            </p>
          </div>
          {/* HVAC Services */}
          {activeService === "HVAC" && (
            <div
              id="HVAC"
              className="d-flex flex-wrap justify-content-center gap-4"
            >
              <div className="HVAC-services text-center">
                <img
                  src={AcIcon}
                  alt="Ac installation"
                  className="HVAC-img mb-2"
                />
                <p>All types of AC and Heat pump installation</p>
              </div>
              <div className="HVAC-services text-center">
                <img src={ToolsIcon} alt="Repairs" className="HVAC-img mb-2" />
                <p>All types of AC repairs and replacements</p>
              </div>
              <div className="HVAC-services text-center">
                <img
                  src={MaintenanceIcon}
                  alt="Maintenance"
                  className="HVAC-img mb-2"
                />
                <p>All types of maintenance for all types of AC</p>
              </div>
            </div>
          )}
          {/* Commercial Kitchen & Bakery Services */}
          {activeService === "CB" && (
            <div
              id="CB"
              className="d-flex flex-wrap justify-content-center gap-4"
            >
              <div className="CB-services text-center">
                <img
                  src={OvenIcon}
                  alt="Commercial Kitchen & Bakery Installation"
                  className="CB-img mb-2"
                />
                <p>
                  All types of Commercial Kitchen and Bakery Equipment
                  installation
                </p>
              </div>
              <div className="CB-services text-center">
                <img
                  src={DrillIcon}
                  alt="Maintenance"
                  className="CB-img mb-2"
                />
                <p>All types of Commercial Kitchen and Bakery maintenance</p>
              </div>
              <div className="CB-services text-center">
                <img src={ToolboxIcon} alt="Repairs" className="CB-img mb-2" />
                <p>All types of Commercial Kitchen and Bakery repairs</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
