import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/profileService";
import ProfileField from "../components/ProfileField";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");

  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile();

      setProfile(data);

      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
      });
    };

    loadProfile();
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    try {
      setSaving(true);

      const updatedProfile = await updateProfile(formData);

      setProfile(updatedProfile);
      setFormData(updatedProfile);

      setIsEditing(false);
      setSuccess("Profile updated successfully!");

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      zip_code: profile.zip_code,
    });

    setIsEditing(false);
  };

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {success && <div className="alert alert-success">{success}</div>}
        <h2>My Profile</h2>

        <div className="card mt-4">
          <div className="card-body">
            <h5>Account Information</h5>

            <hr />

            <div className="mb-3">
              {isEditing ? (
                <div className="d-flex gap-2 mt-2">
                  <strong>Name:</strong>
                  <input
                    className="form-control"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_name: e.target.value,
                      })
                    }
                  />

                  <input
                    className="form-control"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <p className="mb-3">
                  <strong>Name:</strong>{" "}
                  {`${profile.first_name} ${profile.last_name}`.trim() ||
                    "Not provided"}
                </p>
              )}
            </div>

            <p>
              <strong>Email:</strong> {profile?.email || "Not provided"}
            </p>

            <ProfileField
              label="Phone"
              value={formData.phone}
              isEditing={isEditing}
              placeholder="Enter your phone number"
              onChange={(value) =>
                setFormData({
                  ...formData,
                  phone: value,
                })
              }
            />

            <ProfileField
              label="Address"
              value={formData.address}
              isEditing={isEditing}
              placeholder="Enter your address"
              onChange={(value) =>
                setFormData({
                  ...formData,
                  address: value,
                })
              }
            />

            <ProfileField
              label="City"
              value={formData.city}
              isEditing={isEditing}
              placeholder="Enter your city"
              onChange={(value) =>
                setFormData({
                  ...formData,
                  city: value,
                })
              }
            />

            <ProfileField
              label="State"
              value={formData.state}
              isEditing={isEditing}
              placeholder="Enter your state"
              onChange={(value) =>
                setFormData({
                  ...formData,
                  state: value,
                })
              }
            />

            <ProfileField
              label="ZIP Code"
              value={formData.zip_code}
              isEditing={isEditing}
              placeholder="Enter your ZIP code"
              onChange={(value) =>
                setFormData({
                  ...formData,
                  zip_code: value,
                })
              }
            />

            {isEditing ? (
              <div className="d-flex gap-2 justify-content-end mb-3">
                <button
                  className="btn btn-success"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-end mb-3">
                <button
                  className="btn btn-outline-success"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
