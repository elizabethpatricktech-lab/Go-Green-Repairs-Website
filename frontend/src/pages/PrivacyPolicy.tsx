import Navbar from "../components/Navbar";
import ContactForm from "../components/Contact";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar></Navbar>

      <h1>Go Green Repairs Inc. Terms and Conditions / Privacy Policy:</h1>
      <div className="text-box-privacy">
        <p className="fw-semibold">
          Go Green Repairs Inc. Respects your privacy. By opting into our SMS
          messaging service, you agree to the following terms regarding how we
          handle your data.
        </p>
        <ul className="fw-semibold">
          • Data Collection: We will collect your name, E mail address, mailing
          address, and mobile phone number when you sign up for SMS updates. The
          information will be collected via the website contact form, email,
          rental agreement, or third-party reservation systems.
        </ul>
        <ul className="fw-semibold">
          • Data Usage: We use your data solely for sending Customer Care.
        </ul>
        <ul className="fw-semibold">
          • Data Security: We protect your data with secure storage measures to
          prevent unauthorized access.
        </ul>
        <ul className="fw-semibold">
          • Data Retention: We retain your information if you are subscribed to
          our SMS service. You may request deletion at any time.
        </ul>
        <ul className="fw-semibold">
          • MESSAGE AND DATA RATES MAY APPLY. Your mobile carrier may charge
          fees for sending or receiving text messages, especially if you do not
          have an unlimited texting or data plan.
        </ul>
        <ul className="fw-semibold">
          • Messages are recurring, and message frequency varies.
        </ul>
        <ul>
          • Contact Go Green Repairs Inc. at (888) 526-5850 or
          gogreenrepairinc@gmail.com for HELP or to STOP receiving messages.
        </ul>
        <ul className="fw-semibold">
          • Opt-Out: You can opt out of the SMS list at any time by texting,
          emailing, or replying STOP or UNSUBSCRIBE to
          gogreenrepairinc@gmail.com or (888) 526-5850 After unsubscribing, you
          will receive a final SMS to confirm you have unsubscribed and we will
          remove your number from our list within 24 hours.
        </ul>
        <ul className="fw-semibold">
          • You can send HELP for additional assistance, and you will receive a
          text including our Phone number, email and website. We are here to
          help you.
        </ul>
        <p className="fw-bold">
          Non-Sharing Clause: We do not share your data with third parties for
          marketing purposes. Go Green Repairs Inc, will not sell, rent, or
          share the collected mobile numbers.
        </p>
      </div>

      <ContactForm></ContactForm>
    </div>
  );
};

export default PrivacyPolicy;
