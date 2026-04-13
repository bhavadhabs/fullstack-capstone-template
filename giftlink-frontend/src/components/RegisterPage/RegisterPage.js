import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config.js";
import { useAppContext } from "../../context/AuthContext.js";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setIsLoggedIn, setUserName } = useAppContext();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (data.authtoken) {
        const name = data.firstName || firstName;

        // 💾 Save session
        sessionStorage.setItem("auth-token", data.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", data.email || email);

        // 🔥 Update UI instantly
        setIsLoggedIn(true);
        setUserName(name);

        navigate("/app");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input className="form-control mb-2" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
        <input className="form-control mb-2" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
        <input className="form-control mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;