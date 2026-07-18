import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getProfile } from "../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>My Profile</h2>

        <div className="card mt-4">
          <div className="card-body">
            <h5>Account Information</h5>

            <hr />

            <p>
              <strong>Name:</strong>{" "}
              {profile
                ? `${profile.first_name} ${profile.last_name}`.trim() ||
                  profile.username
                : "Not provided"}
            </p>

            <p>
              <strong>Email:</strong> {profile?.email || "Not provided"}
            </p>

            <p>
              <strong>Phone:</strong> {profile?.phone || "Not provided"}
            </p>

            <p>
              <strong>Address:</strong> {profile?.address || "Not provided"}
            </p>

            <p>
              <strong>City:</strong> {profile?.city || "Not provided"}
            </p>

            <p>
              <strong>State:</strong> {profile?.state || "Not provided"}
            </p>

            <p>
              <strong>Zip Code:</strong> {profile?.zip_code || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
