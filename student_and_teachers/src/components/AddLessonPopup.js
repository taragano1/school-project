import React, { useState, useEffect } from "react";
import { Read, Add } from "./CRUD";

export default function AddLessonPopup({ show, onClose, onAddLesson }) {
  const [subjects, setSubjects] = useState([]);
  const [newLesson, setNewLesson] = useState({
    date: "",
    hour: "",
    subjectId: "",
    studentId: "",
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await Read("/api/subjects");
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    Add("/api/lessons", newLesson)
      .then((response) => {
        console.log("Lesson added successfully", response);
        onAddLesson(response); // Update parent component with new lesson
      })
      .catch((error) => {
        console.error("Error adding lesson:", error);
      });
  };

  if (!show) return null;

  return (
    <div className="popup">
      <h2>הוסף שיעור חדש</h2>
      <label>
        זמן:
        <input
          type="text"
          name="hour"
          value={newLesson.hour}
          onChange={handleChange}
        />
      </label>
      <label>
        תאריך:
        <input
          type="text"
          name="date"
          value={newLesson.date}
          onChange={handleChange}
        />
      </label>
      <label>
        נושא:
        <select
          name="subjectId"
          value={newLesson.subjectId}
          onChange={handleChange}
        >
          <option value="">בחר מקצוע</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        תלמיד:
        <input
          type="text"
          name="studentId"
          value={newLesson.studentId}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleAdd}>הוסף</button>
      <button onClick={onClose}>סגור</button>
    </div>
  );
}
