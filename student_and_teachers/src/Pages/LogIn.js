import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Read } from "../CRUD"; // נשתמש בפונקציה זו לשליחת הבקשה

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // שליחת הבקשה לשרת
      const response = await Read(`/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

      if (response.error) {
        setError(response.error);
      } else {
        setUser(response.user);
        // אם ההתחברות הצליחה, נניח שנרצה לנתב לדף אחר
        navigate("/dashboard"); // שנה לכתובת המתאימה
      }
    } catch (error) {
      setError("An error occurred while trying to log in");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
      <div>
        <Link to="/teacher/signIn">Register as Teacher</Link>
        <Link to="/student/signIn">Register as Student</Link>
      </div>
    </div>
  );
}

