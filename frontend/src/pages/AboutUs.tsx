import AboutUsImage from "/Images/About-Us-Image.jpg";

const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Image */}
          <div className="col-12 col-md-6">
            <img
              src={AboutUsImage}
              alt="Person fixing AC"
              id="about-us-img"
              className="img-fluid rounded"
            />
          </div>

          {/* Text */}
          <div className="col-12 col-md-6" id="about-us-words">
            <h1>About Us</h1>
            <div className="text-box mb-3 fw-semibold">
              At Go Green Repairs, we specialize in keeping you comfortable and
              your business running without interruptions. From air conditioning
              systems to commercial kitchen and bakery equipment, we handle it
              all because we fix all brands and all problems. We know how
              important reliable systems are, whether you’re a business owner or
              a homeowner. That’s why our mission is to keep your systems
              working efficiently to save your energy and reduce costs. Whether
              it’s routine maintenance, emergency repairs, or complete system
              replacements, we’ve got you covered. If your equipment has reached
              the end of its life, we can replace your old inefficient system
              with a new efficient system designed to perform better and save
              you money long term. At Go Green Repairs, our promise is simple:
              if Go Green Repairs can’t fix it, no one can.
            </div>

            <a href="/more-about-us">
              <button className="btn btn-success btn-lg">Read More</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
