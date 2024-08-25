import React, { useState, useEffect } from "react";
import { Read, Update, Delete } from "./CRUD";
import TeacherDetails from "../components/TeacherDetails";
import AddLessonPopup from "../components/AddLessonPopup";

export default function TeacherPage({ teacherId }) {
  const [showDetails, setShowDetails] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [showAddLessonPopup, setShowAddLessonPopup] = useState(false);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    // פונקציה לשליפת פרטי המורה
    const fetchTeacher = async () => {
      try {
        const data = await Read(`/api/users/${teacherId}`);
        setTeacher(data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    // פונקציה לשליפת שיעורים
    const fetchLessons = async () => {
      try {
        const data = await Read(`/api/lessons/${teacherId}`);
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    if (teacherId) {
      fetchTeacher();
      fetchLessons();
    }
  }, [teacherId]);

  const handleCancelLesson = (lessonId) => {
    if (window.confirm("האם אתה בטוח שברצונך לבטל את השיעור הזה?")) {
      Delete(`/api/lessons/${lessonId}`)
        .then((response) => {
          console.log("Lesson cancelled successfully", response);
          setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
        })
        .catch((error) => {
          console.error("Error cancelling lesson:", error);
        });
    }
  };

  const handleFeedback = (lessonId) => {
    // פונקציה לפתיחת חלון או פעולה להוספת משוב
    console.log("Feedback for lesson ID:", lessonId);
  };

  const handleUpdateLesson = (lessonId) => {
    // פונקציה לפתיחת חלון או פעולה לעדכון שיעור
    console.log("Update lesson ID:", lessonId);
  };

  const isPastLesson = (lessonDate) => {
    const currentDate = new Date();
    const lessonDateObj = new Date(lessonDate);
    return lessonDateObj < currentDate;
  };

  return (
    <div className="teacher-page">
      {teacher ? (
        <>
          <h1>עמוד המורה - {teacher.fname} {teacher.lname}</h1>
          <button onClick={() => setShowDetails(true)}>הצג פרטי מורה</button>
          <button onClick={() => setShowAddLessonPopup(true)}>הוסף שיעור חדש</button>

          {/* טבלת שיעורים */}
          <table>
            <thead>
              <tr>
                <th>תאריך</th>
                <th>שעה</th>
                <th>נושא</th>
                <th>תלמיד</th>
                <th>פעולה</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td>{lesson.date}</td>
                  <td>{lesson.hour}</td>
                  <td>{lesson.subject}</td>
                  <td>{lesson.student}</td>
                  <td>
                    <button onClick={() => handleUpdateLesson(lesson.id)}>עדכן</button>
                    <button onClick={() => handleCancelLesson(lesson.id)}>ביטול</button>
                    {isPastLesson(lesson.date) && (
                      <button onClick={() => handleFeedback(lesson.id)}>משוב</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* הצגת קומפוננטת פרטי המורה */}
          {showDetails && (
            <TeacherDetails
              teacher={teacher}
              onClose={() => setShowDetails(false)}
            />
          )}

          {/* הצגת קומפוננטת הוספת שיעור חדש */}
          {showAddLessonPopup && (
            <AddLessonPopup
              show={showAddLessonPopup}
              onClose={() => setShowAddLessonPopup(false)}
              onAddLesson={(newLesson) => {
                setLessons((prevLessons) => [...prevLessons, newLesson]);
              }}
            />
          )}
        </>
      ) : (
        <p>טוען פרטי מורה...</p>
      )}
    </div>
  );
}
