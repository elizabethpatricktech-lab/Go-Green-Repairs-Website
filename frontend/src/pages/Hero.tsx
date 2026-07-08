import heroImage from "/Images/Air-Condition-hero-photo.png";

const Hero: React.FC = () => {
  return (
    <section className="hero position-relative">
      {/* Hero Image */}
      <img
        src={heroImage}
        alt="Air Conditioner"
        className="hero-img img-fluid w-100"
        style={{ maxHeight: "600px", objectFit: "cover" }}
      />

      {/* Overlay Text */}
      <div
        className="hero-content position-absolute top-50 start-50 translate-middle text-center text-white px-3"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="mb-3">
          From ACs to Ovens, we keep it running. Repairs done right, the first
          time.
        </h1>
        <p className="mb-2">
          Your one-stop solution for AC, kitchen, and bakery equipment repairs.
          We fix all brands, all problems — if we can't fix it, no one can.
        </p>
        <p className="mb-3">
          In Brooklyn, Queens, Manhattan, Bronx and Staten Island, etc.
        </p>
        <a className="nav-link" href="/#contact-us">
          <button className="btn btn-success btn-lg">Contact Us</button>
        </a>
      </div>
    </section>
  );
};

export default Hero;
