import React, { useState, useEffect } from "react";
import type { Project } from "../data/projects";
import { Modal, Carousel } from "react-bootstrap";

interface Props {
  projects: Project[];
}

const OurWork: React.FC<Props> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [chunkSize, setChunkSize] = useState(getChunkSize());

  function getChunkSize() {
    if (window.innerWidth < 768) return 1; // Mobile
    if (window.innerWidth < 1024) return 2; // Tablet
    return 3; // Desktop
  }

  useEffect(() => {
    // Update chunk size on window resize
    const handleResize = () => setChunkSize(getChunkSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide outer carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex, chunkSize]);

  const chunkProjects = (arr: Project[], chunk: number): Project[][] => {
    const chunks: Project[][] = [];
    for (let i = 0; i < arr.length; i += chunk) {
      chunks.push(arr.slice(i, i + chunk));
    }
    return chunks;
  };

  const handlePrev = () => {
    const chunks = chunkProjects(projects, chunkSize);
    setCurrentIndex((prev) => (prev === 0 ? chunks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    const chunks = chunkProjects(projects, chunkSize);
    setCurrentIndex((prev) => (prev === chunks.length - 1 ? 0 : prev + 1));
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const chunks = chunkProjects(projects, chunkSize);

  return (
    <div id="our-work" className="container my-5">
      <h2 className="mb-4">Our Work</h2>

      <div className="d-flex justify-content-between mb-2">
        <button className="btn btn-success" onClick={handlePrev}>
          &lt;
        </button>
        <button className="btn btn-success" onClick={handleNext}>
          &gt;
        </button>
      </div>

      <div className="row">
        {chunks[currentIndex].map((project) => (
          <div key={project.id} className={`col-${12 / chunkSize} mb-4`}>
            <div
              className="card h-100 text-bg-success"
              style={{ cursor: "pointer" }}
              onClick={() => handleProjectClick(project)}
            >
              {project.media[0].type === "image" ? (
                <img
                  src={project.media[0].src}
                  className="card-img-top"
                  alt={project.title}
                  style={{ objectFit: "cover", height: "200px", width: "100%" }}
                />
              ) : (
                <video
                  src={project.media[0].src}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px", width: "100%" }}
                  muted
                  controls
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for individual project */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <Carousel
              indicators={true}
              nextLabel=""
              prevLabel=""
              interval={null}
            >
              {selectedProject.media.map((item, idx) => (
                <Carousel.Item key={idx}>
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      className="d-block w-100"
                      style={{ objectFit: "contain", maxHeight: "500px" }}
                      alt={`Slide ${idx}`}
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="d-block w-100"
                      controls
                      style={{ maxHeight: "500px" }}
                    />
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Modal.Body>
      </Modal>

      <style>
        {`
          /* Dark arrows in modal carousel */
          .modal .carousel-control-prev-icon,
          .modal .carousel-control-next-icon {
            background-color: rgba(0,0,0,0.6);
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default OurWork;
