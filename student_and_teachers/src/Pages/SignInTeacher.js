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
    isSpecialEducation: false,
    educationLevel: "",
    password: "",
    resume: "", // נוסיף שדה חדש לרזומה
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files);

    const fileReaders = droppedFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders)
      .then(results => {
        setFiles(prevFiles => [...prevFiles, ...results]); // הוסף קבצים למערך הקיים
      })
      .catch(error => console.error("Error reading files:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert gender to number
    const genderMap = {
      זכר: 1,
      נקבה: 2,
    };

    const genderId = genderMap[formData.gender];

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
        // Add the teacher to the 'teachers' table
        return Add("/teachers", {
          id: formData.id,
          resume: formData.resume,
          specialization_id: formData.studyNeed,
          subject: 0, // Set subject to a default value or based on form data if available
          isSpecialEducation: formData.isSpecialEducation,
          educationLevel: formData.educationLevel
        });
      })
      .then(() => {
        // Navigate to the teacher main page
        navigate(`/teacher/main/${formData.id}`);
      })
      .catch((error) => console.error("Error:", error));
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
          <label>רמת ההשכלה:</label>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
          >
            <option value="ללא">ללא</option>
            <option value="תואר">תואר</option>
            <option value="תעודה">תעודה</option>
          </select>
        </div>
        <div>
          <button
            type="button"
            onClick={() => document.getElementById('fileInput').click()}
          >
            להוספת מסמך
          </button>
          <input
            id="fileInput"
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files);
              const fileReaders = selectedFiles.map(file => {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result);
                  reader.onerror = () => reject(reader.error);
                  reader.readAsDataURL(file);
                });
              });

              Promise.all(fileReaders)
                .then(results => {
                  setFiles(prevFiles => [...prevFiles, ...results]); // הוסף קבצים למערך הקיים
                })
                .catch(error => console.error("Error reading files:", error));
            }}
          />
          <div
            style={{
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "20px",
              marginTop: "10px",
              cursor: "pointer",
              textAlign: "center"
            }}
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()} // מנע את ברירת המחדל
          >
            גרור ושחרר קבצים לכאן
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
          <select
            name="studyNeed"
            value={formData.studyNeed}
            onChange={handleChange}
          >
            <option value="יסודי">יסודי</option>
            <option value="אקדמאי">אקדמאי</option>
            <option value="תיכון">תיכון</option>
          </select>
        </div>
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
      <div>
        <h3>קבצים שנבחרו:</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                קובץ {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
