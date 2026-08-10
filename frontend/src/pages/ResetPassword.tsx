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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setGeneralError("");

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match.",
      });
      return;
    }

    try {
      const response = await resetPassword(uid!, token!, password);

      setMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      console.error(error);

      const data = error.response?.data;

      if (data) {
        const fieldErrors: Record<string, string> = {};

        Object.keys(data).forEach((field) => {
          if (Array.isArray(data[field])) {
            fieldErrors[field] = data[field][0];
          }
        });

        setErrors(fieldErrors);
      } else {
        setGeneralError("Unable to reset your password. Please try again.");
      }
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
            {generalError && (
              <div className="alert alert-danger">{generalError}</div>
            )}

            {!message && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <PasswordInput
                    label="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    required
                  />
                </div>

                <div className="mb-3">
                  <PasswordInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);

                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.confirmPassword;
                        return newErrors;
                      });
                    }}
                    error={errors.confirmPassword}
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
