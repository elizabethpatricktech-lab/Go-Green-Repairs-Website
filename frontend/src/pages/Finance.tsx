import { useEffect } from "react";
import MomntBanner2 from "/Images/momnt-web-banner(1).webp";

const Finance: React.FC = () => {
  useEffect(() => {
    // Load the Momnt widget script dynamically
    const script = document.createElement("script");
    script.src =
      "https://momnt-prod.s3.amazonaws.com/widgets/mega_widget.min.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="finance" className="py-5">
      <div className="container">
        <h1 className="mb-5 text-center">Financing</h1>
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          {/* Row with banner and widget side by side */}
          <div className="row align-items-center justify-content-center g-3">
            {/* Banner */}
            <div className="col-12 col-md-6">
              <img
                src={MomntBanner2}
                alt="Momnt Banner"
                className="img-fluid w-100"
              />
            </div>

            {/* Widget */}
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <div
                id="momnt-widget"
                data-merchant-id="3241a5ed-341e-4179-91f0-81762855cd26"
              ></div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <img
            src="/Images/Equal-Housing-Logo.png"
            alt="Equal Housing Logo"
            className="rounded"
          />
        </div>
        <a
          href="/financing"
          className="d-flex justify-content-center text-decoration-none"
        >
          <button className="btn btn-success btn-lg" id="finance-btn">
            Learn More
          </button>
        </a>
      </div>
    </section>
  );
};

export default Finance;
