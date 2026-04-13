import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext.js";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } =
    useAppContext();

  const navigate = useNavigate();

  // ✅ Load auth ONCE
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const name = sessionStorage.getItem("name");

    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "User");
    }
  }, [setIsLoggedIn, setUserName]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    navigate("/app/login");
  };

  const goToProfile = () => {
    navigate("/app/profile");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <Link className="navbar-brand" to="/app">
        GiftLink
      </Link>

      <div className="navbar-collapse justify-content-end">
        <ul className="navbar-nav custom-nav">

          <li className="nav-item">
            <Link className="nav-link" to="/app">Home</Link>
          </li>

          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/app");

                setTimeout(() => {
                  const section = document.getElementById("gifts-section");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }, 300);
              }}
            >
              Gifts
            </span>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/app/search">Search</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="nav-link profile-text" onClick={goToProfile}>
                  👤 {userName || "User"}
                </span>
              </li>

              <li className="nav-item">
                <button className="btn btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-login" to="/app/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-register" to="/app/register">
                  Register
                </Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}