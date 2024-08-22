import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInStudent.css";
import "../CRUD"
import { Add } from "../CRUD";
export default function SignInStudent() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    gender: "",
    phone: "",
    birthDate: "",
    email: "",
    nationality: "",
    city: "",
    address: "",
    studyNeed: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData); // For demonstration purposes
    localStorage.setItem("LSCurrentUser", JSON.stringify(formData));
    Add("/users",formData)
    navigate(`/student/main/${formData.id}`);
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
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
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
          <label>לאום:</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
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
          <label>צורך הלימוד:</label>
          <select
            name="studyNeed"
            value={formData.studyNeed}
            onChange={handleChange}
          >
            <option value="">בחר צורך הלימוד</option>
            <option value="יסודי">יסודי</option>
            <option value=" אקדמאי"> אקדמאי</option>
            <option value=" תיכון"> תיכון</option>
          </select>
        </div>
        <button type="submit">הרשמה</button>
      </form>
    </div>
  );
}
