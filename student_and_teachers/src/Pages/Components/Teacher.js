import React from "react";

const Teacher = ({ teacher, onRemove, onViewFeedback }) => {
    return (
        <div className="teacher-item">
            <p>תז: {teacher.id}</p>
            <p>שם: {teacher.name}</p>
            <button onClick={() => onRemove(teacher.id)}>הסר מורה</button>
            <button onClick={() => onViewFeedback(teacher.id)}>צפה בפידבקים</button>
            <button>כפתור אחר</button>
        </div>
    );
};

export default Teacher;
