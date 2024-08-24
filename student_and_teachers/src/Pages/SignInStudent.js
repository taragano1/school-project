import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInStudent.css";
import "../CRUD";
import { Add } from "../CRUD";

export default function SignInStudent() {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    email: "",
    phone: "",
    city: "",
    birthDate: "",
    address: "",
    gender: "",
    studyNeed: "",
    class: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert gender to number
    const genderMap = {
      זכר: 1,
      נקבה: 2,
    };
    const genderId = genderMap[formData.gender];
  
    // Convert studyNeed to number
    const studyNeedMap = {
      יסודי: 0,
      תיכון: 1,
      אקדמאי: 2,
    };
    const studyNeedId = studyNeedMap[formData.studyNeed];
  
    // Extract the necessary fields for the USER table
    const userPayload = {
      id: formData.id,
      fname: formData.firstName,
      lname: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      birthday: formData.birthDate,
      address: formData.address,
      gender_id: genderId, // Use the mapped gender ID
    };
  
    // Save user data locally (optional)
    localStorage.setItem("LSCurrentUser", JSON.stringify(formData));
  
    // Add the user to the 'users' table
    Add("/users", userPayload)
      .then(() => {
        // Add the password to the 'passwords' table
        return Add("/passwords", {
          userId: formData.id,
          password: formData.password,
        });
      })
      .then(() => {
        // Add the student to the 'students' table
        return Add("/students", {
          id: formData.id,
          clas: formData.class,
          specialization_id: studyNeedId, // Use the mapped study need ID
        });
      })
      .then(() => {
        // Navigate to the student main page
        navigate(`/student/main/${formData.id}`);
      })
      .catch((error) => console.error("Error:", error));

  };

  return (
    <div>
      <h2>הרשמת תלמיד</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם פרטי:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>שם משפחה:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>תעודת זהות:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>מגדר:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="זכר">זכר</option>
            <option value="נקבה"> נקבה</option>
          </select>
        </div>
        <div>
          <label>טלפון:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>תאריך לידה:</label>
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>אימייל:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>עיר:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>כתובת:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>סיסמא:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>כיתה:</label>
          <select name="class" value={formData.class} onChange={handleChange}>
            <option value="א">א</option>
            <option value="ב">ב</option>
            <option value="ג">ג</option>
            <option value="ד">ד</option>
            <option value="ה">ה</option>
            <option value="ו">ו</option>
            <option value="ז">ז</option>
            <option value="ח">ח</option>
            <option value="ט">ט</option>
            <option value="י">י</option>
            <option value="יא">יא</option>
            <option value="יב">יב</option>
            <option value="אחר">אחר</option>
          </select>
        </div>
        <div>
          <label>צורך הלימוד:</label>
          <select
            name="studyNeed"
            value={formData.studyNeed}
            onChange={handleChange}
          >
            <option value="יסודי">יסודי</option>
            <option value="תיכון">תיכון</option>
            <option value="אקדמאי">אקדמאי</option>
          </select>
        </div>
        <button type="submit">הרשמה</button>
      </form>
    </div>
  );
}

