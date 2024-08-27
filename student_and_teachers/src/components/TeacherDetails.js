import React from "react";
import { Update, Delete } from "../CRUD";

export default function TeacherDetails({ teacher, onClose }) {
  const handleUpdate = () => {
    const updatedTeacher = {
      // כאן אתה יכול לעדכן את הפרטים לפי הצורך
      fname: teacher.fname,
      lname: teacher.lname,
      email: teacher.email,
    };

    Update(`/api/teachers/${teacher.id}`, updatedTeacher)
      .then((response) => {
        console.log("Teacher updated successfully", response);
        onClose(); // סוגר את חלון הפרטים לאחר העדכון
      })
      .catch((error) => {
        console.error("Error updating teacher:", error);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      Delete(`/api/teachers/${teacher.id}`)
        .then((response) => {
          console.log("Teacher deleted successfully", response);
          onClose(); // סוגר את חלון הפרטים לאחר המחיקה
        })
        .catch((error) => {
          console.error("Error deleting teacher:", error);
        });
    }
  };

  return (
    <div className="teacher-details">
      <h2>פרטי המורה</h2>
      <p>שם פרטי: {teacher.fname}</p>
      <p>שם משפחה: {teacher.lname}</p>
      <p>אימייל: {teacher.email}</p>
      <button onClick={handleUpdate}>עדכן פרטים</button>
      <button onClick={handleDelete}>מחק מורה</button>
      <button onClick={onClose}>סגור</button>
    </div>
  );
}
