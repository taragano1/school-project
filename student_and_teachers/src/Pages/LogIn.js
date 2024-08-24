import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Read } from "../CRUD";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("אנא מלא את כל השדות");
      return;
    }

    try {
      const response = await Read(`/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

      if (response.error) {
        setError(response.error);
      } else {
        setUser(response.user);

        // בדיקה אם המשתמש הוא מורה
        const teacherResponse = await Read(`/teachers/${response.user.id}`);

        if (teacherResponse.error) {
          // אם המשתמש אינו מורה, נבדוק אם הוא תלמיד
          const studentResponse = await Read(`/students/${response.user.id}`);

          if (studentResponse.error) {
            // אם גם לא נמצא תלמיד, ננווט לדף הראשי של מנהל
            navigate("/admin/dashboard");
          } else {
            // אם המשתמש הוא תלמיד, ננווט לדף הראשי של התלמיד
            navigate("/student/dashboard");
          }
        } else {
          // אם המשתמש הוא מורה, ננווט לדף הראשי של המורה
          navigate("/teacher/dashboard");
        }
      }
    } catch (error) {
      setError("אירעה שגיאה במהלך ניסיון ההתחברות");
    }
  };

  return (
    <div>
      <h1>התחברות</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            אימייל:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            סיסמה:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <button type="submit">התחבר</button>
        </div>
      </form>
      <div>
        <Link to="/teacher/signIn">הרשם כמורה</Link>
        <Link to="/student/signIn">הרשם כתלמיד</Link>
      </div>
    </div>
  );
}
