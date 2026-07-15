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
                : "Loading..."}
            </p>

            <p>
              <strong>Email:</strong> {profile?.email || "Loading..."}
            </p>

            <p>
              <strong>Phone:</strong> Not provided
            </p>

            <p>
              <strong>Address:</strong> Not provided
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
