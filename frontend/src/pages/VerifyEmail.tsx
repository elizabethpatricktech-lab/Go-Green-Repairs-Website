import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { verifyEmail } from "../services/authService";

const VerifyEmail = () => {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail(uid!, token!);

        setMessage(response.message);
        setSuccess(true);
      } catch {
        setMessage("This verification link is invalid or has expired.");
      }
    };

    verify();
  }, [uid, token]);

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <h2>Email Verification</h2>

            <p>{message}</p>

            {success && (
              <button
                className="btn btn-success"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
