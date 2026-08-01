import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { resetPassword } from "../services/authService";
import PasswordInput from "../components/PasswordInput";

const ResetPassword = () => {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword(uid!, token!, password);

      setMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Unable to reset password.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="text-center mb-4">Reset Password</h2>

            {message && <div className="alert alert-success">{message}</div>}

            {!message && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <PasswordInput
                    label="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <PasswordInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-success w-100" type="submit">
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
