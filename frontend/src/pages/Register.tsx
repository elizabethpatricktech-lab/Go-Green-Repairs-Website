import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { register } from "../services/authService";
import PasswordInput from "../components/PasswordInput";

interface RegisterErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  non_field_errors?: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [error, setError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmPasswordError("");

    setError("");
    setErrors({});
    setSuccess("");

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
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
    } catch (err: any) {
      const data = err.response?.data;

      if (data) {
        setErrors({
          first_name: data.first_name?.[0],
          last_name: data.last_name?.[0],
          email: data.email?.[0],
          password: data.password?.[0],
          non_field_errors: data.non_field_errors?.[0],
        });
      } else {
        setError("Unable to create account. Please try again.");
      }
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
                  className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                />

                {errors.first_name && (
                  <div className="invalid-feedback">{errors.first_name}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>

                <input
                  type="text"
                  className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  required
                />

                {errors.last_name && (
                  <div className="invalid-feedback">{errors.last_name}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>

              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />

              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <PasswordInput
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    password: undefined,
                  }));
                }}
                required
              />

              {errors.password && (
                <div className="text-danger small mt-1">{errors.password}</div>
              )}
            </div>

            <div className="mb-4">
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                required
              />

              {confirmPasswordError && (
                <div className="text-danger small mt-1">
                  {confirmPasswordError}
                </div>
              )}
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
