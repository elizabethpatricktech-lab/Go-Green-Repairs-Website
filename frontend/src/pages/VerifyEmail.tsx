import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { verifyEmail } from "../services/authService";
import type { ProfileData } from "../types/Profile";
import { getProfile } from "../services/profileService";

const VerifyEmail = () => {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile();
      console.log(data);
      setProfile(data);
    };

    loadProfile();
  }, []);

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

  if (!profile) return;
  profile.is_verified = true;

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
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
