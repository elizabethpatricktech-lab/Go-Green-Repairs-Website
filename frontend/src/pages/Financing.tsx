import Navbar from "../components/Navbar";
import ContactForm from "../components/Contact";

const Financing = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1 className="mb-5"> More About Financing</h1>
      <img
        src="Images/momnt-big-banner.png"
        alt="Momnt banner"
        className="rounded mx-auto d-block"
      />
      <a
        href="https://app.momnt.com/widgets/?merchantId=3241a5ed-341e-4179-91f0-81762855cd26&widget=ConsumerLoanAppli
cationWizard"
        className="d-flex justify-content-center text-decoration-none"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="btn btn-success btn-lg">Get Financing Today</button>
      </a>
      <ContactForm></ContactForm>
    </div>
  );
};

export default Financing;
