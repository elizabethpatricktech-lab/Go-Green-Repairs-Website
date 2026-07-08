import Navbar from "../components/Navbar";
import ContactForm from "../components/Contact";

const MoreAboutUs = () => {
  return (
    <div>
      <Navbar></Navbar>

      <h1 className="mb-5"> More About Us</h1>

      <div className="w-auto p-1 fw-medium">
        At Go Green Repairs, we specialize in keeping you comfortable and your
        business running without interruptions. From air conditioning systems to
        commercial kitchen and bakery equipment, we handle it all because we fix
        all brands and all problems. We know how important reliable systems are,
        whether your a business owner or a home owner. That’s why our mission is
        to keep your systems working efficiently to save your energy and reduce
        costs. Whether it’s routine maintenance, emergency repairs, or complete
        system replacements, we’ve got you covered. If your equipment has
        reached the end of its life, we can replace your old inefficient system
        with a new efficient system designed to perform better and save you
        money long term. Preventive care is just as important as repairs. That’s
        why we also clean your system to keep it working efficiently, avoiding
        breakdowns and extending the life of your equipment. With years of
        experience and a team of highly trained technicians, we pride ourselves
        on fast response times, reliable solutions, and honest service.
        Restaurants, bakeries, cafes, and businesses of all sizes trust us to
        keep their ovens hot, their kitchens running, and their environments
        cool and comfortable.
        <div className="text-box fw-bold">Our mission:</div>
        <div className="text-box fw-medium">
          <ul>
            • Expertise you can trust: Skilled technicians trained across
            multiple brands and machine types.
          </ul>
          <ul>
            • Service you can count on: Quick diagnostics, honest
            recommendations, and efficient repairs.
          </ul>
          <ul>
            • Commitment to your business: We treat every client like a partner,
            because your success depends on reliable equipment.
          </ul>
        </div>
        <div className="text-box fw-semibold">
          At Go Green Repairs, our promise is simple: if Go Green Repairs can’t
          fix it, no one can.
        </div>
      </div>
      <ContactForm></ContactForm>
    </div>
  );
};

export default MoreAboutUs;
