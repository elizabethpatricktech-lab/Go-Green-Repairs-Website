import type { FormEvent } from "react";
import type { ChangeEvent } from "react";
import { useState } from "react";

const ContactForm: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(1); // Default to 'Yes'

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the state when a user clicks a radio button
    setSelectedValue(parseInt(event.target.value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          alert("Thanks — your message was sent!");
          form.reset();
        } else {
          alert("Oops — something went wrong");
        }
      })
      .catch(() => alert("Submission failed — please try again later"));
  };

  return (
    <section id="contact-us">
      <div className="container">
        <div className="row justify-content-center gy-5">
          {/* Left: Contact Info */}
          <div className="col-lg-5">
            <h2 className="mb-4">Get In Touch</h2>
            <p className="mb-2">
              <strong>
                Go Green Repairs HVAC, Commercial Kitchen & Bakery Contractor
              </strong>
            </p>
            <p className="mb-1">
              📞 Call or Text: <a href="tel:8885265850">888‑526‑5850</a>
            </p>
            <p className="mb-1">
              ✉️ Email:{" "}
              <a href="mailto:gogreenrepairinc@gmail.com">
                gogreenrepairinc@gmail.com
              </a>
            </p>
            <p className="mb-1">📍 Serving: Local businesses & homeowners</p>
          </div>

          {/* Right: Contact Form */}
          <div className="col-lg-6 mx-auto">
            <h2 className="mb-4">Contact Us</h2>
            <form
              id="contactForm"
              action="https://script.google.com/macros/s/AKfycbwJBDZH9wBCWj1OfBcisVtYk1--zj25sWKx7h1M_7ncjAMQdc8LDSbILPgh53NCVTHSmA/exec"
              method="post"
              onSubmit={handleSubmit}
              className="p-4 bg-white border rounded shadow-sm"
            >
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="(123) 456‑7890"
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="services" className="form-label">
                    Services Needed
                  </label>
                  <select
                    className="form-select"
                    id="services"
                    name="services"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="HVAC Installation">HVAC Installation</option>
                    <option value="HVAC Repair">HVAC Repair</option>
                    <option value="Bakery Equipment Installation">
                      Bakery Equipment Installation
                    </option>
                    <option value="Bakery Equipment Repair">
                      Bakery Equipment Repair
                    </option>
                    <option value="Commercial Kitchen Equipment Installation">
                      Commercial Kitchen Equipment Installation
                    </option>
                    <option value="Commercial Kitchen Equipment Repair">
                      Commercial Kitchen Equipment Repair
                    </option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="mb-3">
                <p className="small text-muted">
                  Do you agree to receive text messages from{" "}
                  <strong>Go Green Repairs Inc</strong> at{" "}
                  <strong>(888) 526‑5850</strong>? Message frequency varies.
                  Message & data rates may apply. Reply STOP to unsubscribe.
                </p>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault1"
                    value={1}
                    checked={selectedValue === 1}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="radioDefault1">
                    Yes, I agree to receive text messages
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault2"
                    value={2}
                    checked={selectedValue === 2}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="radioDefault2">
                    No, I do not want to receive text messages
                  </label>
                </div>

                <p className="mt-2 small">
                  See our <a href="privacy-policy.html">Privacy Policy</a> for
                  details.
                </p>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100">
                Submit
              </button>
            </form>

            <div className="mt-4 text-muted small text-center">
              &copy; 2025 Go Green Repairs. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
