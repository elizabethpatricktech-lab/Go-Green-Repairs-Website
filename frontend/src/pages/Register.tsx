import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { register } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError("Unable to create account.");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div
          className="card shadow rounded-4 p-4"
          style={{ maxWidth: "550px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold">Create an Account</h2>
            <p className="text-muted">
              Create an account to request service, track repairs, and view your
              service history.
            </p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mb-3">
              Create Account
            </button>

            <div className="text-center">
              <small>
                Already have an account? <Link to="/login">Sign In</Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
