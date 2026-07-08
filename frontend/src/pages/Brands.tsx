import Navbar from "../components/Navbar";
import ContactForm from "../components/Contact";

const Brands = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Brands</h1>
      <p className="w-auto p-3">
        We work with all brands of units for HVAC, and these are the brands we
        work with for Commerical Kitchen and Bakery Equipments. Here are some
        machines we install and repair.
      </p>
      <img
        src="Images/Brands.jpg"
        alt="Brands img"
        id="brands-img"
        className="rounded mx-auto d-block"
      />
      <h5 className="text-center">See Our Work in Action</h5>
      <a
        href="/#our-work"
        className="d-flex justify-content-center text-decoration-none"
      >
        <button className="btn btn-success btn-lg">View Repairs →</button>
      </a>
      <ContactForm></ContactForm>
    </div>
  );
};

export default Brands;
