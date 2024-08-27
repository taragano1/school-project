import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Read } from "../CRUD";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        const user = response.user;

        // בדיקה אם הסטטוס של המשתמש הוא TRUE
        if (user.status === true) {
          if (user.typeOfUser === 1) {
            navigate(`/manager/main/${user.id}`);
          } else if (user.typeOfUser === 2) {
            navigate(`/teacher/main/${user.id}`);
          } else {
            navigate(`/student/main/${user.id}`);
          }
        } else {
          // אם הסטטוס הוא FALSE, הצגת הודעת שגיאה
          setError("החשבון שלך אינו פעיל. אנא פנה למנהל המערכת.");
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


