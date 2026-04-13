import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { urlConfig } from "../../config.js";
import { useAppContext } from "../../context/AuthContext.js";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const { setUserName } = useAppContext();
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");

    if (!token) {
      navigate("/app/login");
      return;
    }

    const email = sessionStorage.getItem("email") || "";
    const name = sessionStorage.getItem("name") || "";

    const user = { name, email };

    setUserDetails(user);
    setUpdatedDetails(user);
  }, [navigate]);

  // ✏️ INPUT CHANGE
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 UPDATE PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("auth-token");

      const res = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }

      // update UI
      setUserDetails(updatedDetails);
      setUserName(updatedDetails.name);

      sessionStorage.setItem("name", updatedDetails.name);

      setEditMode(false);
      setMessage("✅ Profile updated successfully!");

      setTimeout(() => {
        setMessage("");
        navigate("/app");
      }, 1500);

    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="profile-container">

      {!editMode ? (
        <div className="profile-card">
          <h1>Hi, {userDetails.name || "User"} 👋</h1>
          <p><b>Email:</b> {userDetails.email}</p>

          <button className="btn-edit" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>

          {message && <p className="msg">{message}</p>}
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={userDetails.email} disabled />

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={updatedDetails.name || ""}
            onChange={handleInputChange}
            required
          />

          <div className="btn-group">
            <button type="submit" className="btn-save">Save</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>

          {message && <p className="msg">{message}</p>}
        </form>
      )}

    </div>
  );
};

export default Profile;