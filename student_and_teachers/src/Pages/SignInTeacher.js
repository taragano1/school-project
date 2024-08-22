import React, { useState } from "react";
import "./SignInTeacher.css"; // קובץ עיצוב חיצוני

export default function SignInTeacher() {
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
    studyNeed: "",
    isSpecialEducation: false,
    educationLevel: "",
    resume: "" // נוסיף שדה חדש לרזומה
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData); // For demonstration purposes
  };

  return (
    <div>
      <h2>הרשמת מורה</h2>
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
          <label>רמת ההשכלה:</label><br/>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
          >
            <option value="">בחר רמת ההשכלה</option>
            <option value="ללא">ללא</option>
            <option value="תואר">תואר</option>
            <option value="תעודה">תעודה</option>
          </select>
        </div>
        <button type="button">להוספת מסמך</button>
        <div>
          <label>רזומה:</label><br/>
          <textarea
            name="resume"
            value={formData.resume}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>צורך הלימוד:</label><br/>
          <select
            name="studyNeed"
            value={formData.studyNeed}
            onChange={handleChange}
          >
            <option value="">בחר צורך הלימוד</option>
            <option value="יסודי">יסודי</option>
            <option value="תיכון אקדמאי">תיכון אקדמאי</option>
          </select>
        </div>
        <button type="button">מקצועות לימוד</button>
        <div>
          <label>
            <input
              type="checkbox"
              name="isSpecialEducation"
              checked={formData.isSpecialEducation}
              onChange={handleChange}
            />
            מתמחה בחינוך מיוחד
          </label>
        </div>
        
        
        <button type="submit">הרשמה</button>
  
  
      </form>
    </div>
  );
}
