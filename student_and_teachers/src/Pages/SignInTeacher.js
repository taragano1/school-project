import React, { useState } from "react";
import "./SignInTeacher.css";
import { Add } from "../CRUD";
import { useNavigate } from "react-router-dom";

export default function SignInTeacher() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    gender: "",
    phone: "",
    birthDate: "",
    email: "",
    city: "",
    address: "",
    studyNeed: "",
    password: "",
    resume: "",
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileURLs = selectedFiles.map((file) => {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(file); // יצירת URL לקובץ
        resolve({ name: file.name, url });
      });
    });

    Promise.all(fileURLs)
      .then((results) => setFiles((prevFiles) => [...prevFiles, ...results]))
      .catch((error) => console.error("Error reading files:", error));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // המרה למספר עבור מגדר
    const genderMap = {
      זכר: 1,
      נקבה: 2,
    };
    const genderId = genderMap[formData.gender];

    // המרה למספר עבור יכולת הוראה
    const studyNeedMap = {
      יסודי: 0,
      תיכון: 1,
      אקדמאי: 2,
    };
    const studyNeedId = studyNeedMap[formData.studyNeed];

    const userPayload = {
      id: formData.id,
      fname: formData.firstName,
      lname: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      birthday: formData.birthDate,
      address: formData.address,
      gender_id: genderId,
    };

    // שמירת נתוני המשתמש המקומיים (אופציונלי)
    localStorage.setItem("LSCurrentUser", JSON.stringify(formData));

    Add("/users", userPayload)
      .then(() => Add("/passwords", { userId: formData.id, password: formData.password }))
      .then(() => Add("/teachers", {
        id: formData.id,
        resume: formData.resume,
        specialization_id: studyNeedId,
        subject: 0, // ערך ברירת מחדל
        isSpecialEducation: formData.isSpecialEducation,
        educationLevel: formData.educationLevel,
      }))
      .then(() => {
        // אחרי הוספת פרטי המשתמש והמורה, הוסף כל קובץ לטבלה teacher_doc
        const filePromises = files.map((file) => {
          const document = {
            userId: formData.id,
            document: file.url,
          };
          return Add("/teacher_doc", document);
        });

        return Promise.all(filePromises);
      })
      .then(() => navigate(`/teacher/main/${formData.id}`))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h2>הרשמת מורה</h2>
      <form onSubmit={handleSubmit}>
        {/* שדות הטופס */}
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
            <option value="נקבה">נקבה</option>
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
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>אימייל:</label>
          <input
            type="email"
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
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="button" onClick={() => document.getElementById('fileInput').click()}>
            להוספת מסמך
          </button>
          <input
            id="fileInput"
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div
            style={{
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "20px",
              marginTop: "10px",
              cursor: "pointer",
              textAlign: "center",
            }}
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            גרור ושחרר קבצים לכאן
            <div style={{ marginTop: "20px" }}>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }} >
                {files.map((file, index) => (
                  <li key={index}>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <label>רזומה:</label>
          <textarea
            name="resume"
            value={formData.resume}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>יכולות הוראה:</label>
          <select name="studyNeed" value={formData.studyNeed} onChange={handleChange}>
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
