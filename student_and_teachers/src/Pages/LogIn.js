import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Read } from "../CRUD";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const identityOfUser = (user) => {
    return user.role; // assuming the user object has a role property that determines the identity
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    Read(`/login?email=${email}&password=${password}`)
      .then((response) => {
        if (response.success) {
          // Save user data to localStorage
          localStorage.setItem("myUser", JSON.stringify(response.user));

          // Navigate based on user identity
          const userRole = identityOfUser(response.user);
          if (userRole === 's') navigate('/student/main');
          if (userRole === 't') navigate('/teacher/main');
          if (userRole === 'W') navigate('/manager/main');
        } else {
          setError('User name or password are wrong!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('User name or password are wrong!');
      });

    // Clear fields
    setEmail("");
    setPassword("");
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
