import React, { useEffect, useState } from "react";

function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Load user from sessionStorage if not passed as prop
    let currentUser = user;
    if (!currentUser) {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
      }
    }

    if (!currentUser || !currentUser.mobile) {
      setError("No user data found. Please login again.");
      setLoading(false);
      return;
    }

    // ✅ Fetch fresh user data from backend using mobile
    fetch(`http://localhost:1014/api/auth/users/${currentUser.mobile}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="dashboard-section profile-section">
      <h3>User Profile</h3>
      {profile ? (
        <div className="profile-details">
          <div className="profile-item">
            <span className="profile-label">Name:</span>
            <span>{profile.name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span>{profile.email}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Mobile Number:</span>
            <span>{profile.mobile}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Gender:</span>
            <span>{profile.gender}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Date of Birth:</span>
            <span>{profile.dob}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Age:</span>
            <span>{profile.age}</span>
          </div>
        </div>
      ) : (
        <p>No user data available. Please sign up first.</p>
      )}
    </section>
  );
}

export default Profile;
