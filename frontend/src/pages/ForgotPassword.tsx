import { useState } from "react";
import { forgotPassword } from "../services/authService";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email);

      setMessage(response.message);
    } catch (error) {
      console.error(error);
      alert("Unable to send password reset email.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="mb-4 text-center">Forgot Password</h2>

            {message && <div className="alert alert-success">{message}</div>}

            {!message ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-success w-100" type="submit">
                  Send Reset Link
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p>Check your inbox for instructions to reset your password.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
