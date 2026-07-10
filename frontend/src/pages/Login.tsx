import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      const response = await login({
        username: email,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div
          className="card shadow rounded-4 p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">
              Sign in to view your services, track repairs, and request new
              service.
            </p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
              />
              <label className="form-check-label" htmlFor="remember">
                Remember Me
              </label>
            </div>

            <button type="submit" className="btn btn-success w-100 mb-3">
              Sign In
            </button>

            <div className="text-center">
              <small>
                Don't have an account?{" "}
                <Link to="/register">Create Account</Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
