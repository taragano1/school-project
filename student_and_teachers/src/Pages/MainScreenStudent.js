import React, { useState, useEffect } from "react";
import "./MainScreenStudent.css";
import { useParams } from "react-router-dom";
import { Read } from "../CRUD";
import Feedback from "./Feedback";

// קומפוננטת שיעור פנימית
function Lesson({ lesson, currentDateTime }) {
  const [showFeedback, setShowFeedback] = useState(false); // State to control Feedback visibility
  const lessonDate = new Date(lesson.date);
  const lessonTime = lesson.hour.split(":");
  lessonDate.setHours(lessonTime[0], lessonTime[1]);

  let lessonColor = "";

  if (lesson.status === false) {
      lessonColor = "red";
  } else if (lessonDate < currentDateTime) {
      lessonColor = "lightblue";
  } else if (lessonDate.toDateString() === currentDateTime.toDateString()) {
      lessonColor = "green";
  } else {
      lessonColor = "yellow";
  }

  return (
      <div className="lesson" style={{ backgroundColor: lessonColor }}>
          <div className="lesson-details">
              <p>מקצוע: {lesson.id_subject}</p>
              <p>מורה: {lesson.id_teacher}</p>
              <p>תאריך: {lessonDate.toLocaleDateString()}</p>
              <p>שעה: {lessonDate.toLocaleTimeString()}</p>
          </div>
          <div className="lesson-action">
              {lessonDate < currentDateTime ? (
                  <button onClick={() => setShowFeedback(true)}>פידבק</button>
              ) : (
                  <button>לביטול השיעור</button>
              )}
          </div>

          {showFeedback && (
              <div className="feedback-overlay">
                  <Feedback
                      lessonId={lesson.id}
                      sender={true} // or false depending on the context
                      show={showFeedback} // Control visibility with show prop
                  />
                  <button onClick={() => setShowFeedback(false)}>Close Feedback</button>
              </div>
          )}
      </div>
  );
}

// פונקציות לחישוב ימי השבוע נשארות כפי שהן
function getStartOfWeek(date) {
  const day = date.getDay(); 
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function getEndOfWeek(startOfWeek) {
  return new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
}

function getDaysOfWeek(startOfWeek) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);
    days.push(day);
  }
  return days;
}

// קומפוננטת MainScreenStudent
export default function MainScreenStudent() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { id } = useParams();
  const [myUser, setMyUser] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      console.log(id + " useEffect");
  
      try {
        const user = await Read(`/api/users/${id}`);
        console.log("User fetched:", JSON.stringify(user, null, 2)); // הדפס את האובייקט כטקסט בפורמט JSON
        setMyUser(user[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
  
    return () => clearInterval(interval);
  }, [id]);
  



  useEffect(() => {
    const getLessons = async () => {
      const lessonsData = await Read(`/api/lessons/student/${id}`);
      setLessons(lessonsData);
    };

    getLessons();
  }, [id]);

  const startOfWeek = getStartOfWeek(new Date());
  const endOfWeek = getEndOfWeek(startOfWeek);
  const daysOfWeek = getDaysOfWeek(startOfWeek);

  // סינון השיעורים של השבוע הנוכחי
  const lessonsThisWeek = lessons.filter(lesson => {
    const lessonDate = new Date(lesson.date);
    const lessonTime = lesson.hour.split(":");
    lessonDate.setHours(lessonTime[0], lessonTime[1]);

    return lessonDate >= startOfWeek && lessonDate <= endOfWeek;
  });


  return (
    <div className="container">
      {myUser ? (
        <h1 className="title">שלום {myUser.lname}</h1>
      ) : (
        <h1>טוען נתוני משתמש...</h1>
      )}
      <div className="date-time-label">
        {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
      </div>
      <div className="content">
        <div className="buttons">
          <button>פרופיל תלמיד</button>
          <button>קביעת מערכת לשבוע הבא</button>
          <button>עדכון פרופיל</button>
          <button>לצפיית שיעורים שעברו</button>
           {/* <div className="lessons-week">
          {daysOfWeek.map(day => (
            <div key={day.toDateString()} className="day">
              <h2>{day.toLocaleDateString("he-IL", { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</h2>
              {lessonsThisWeek.filter(lesson => new Date(lesson.date).toDateString() === day.toDateString()).map(lesson => (
                <Lesson key={lesson.id} lesson={lesson} currentDateTime={currentDateTime} />
              ))}
            </div>
          ))}
        </div> */}
        </div>
      </div>
    </div>
  );
}



