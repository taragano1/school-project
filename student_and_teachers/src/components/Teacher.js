import React, { useState, useEffect } from "react";

const Teacher = ({ teacher, onRemove, onViewFeedback }) => {
    const [lessons, setLessons] = useState([]);
    const [averageRate, setAverageRate] = useState(0);

    useEffect(() => {
        const getLessons = () => {
            Read(`/lesson/${teacher.id}`).then((l) => {
                setLessons(l);
                if (l.length > 0) {
                    const totalRate = l.reduce((sum, lesson) => sum + lesson.rate, 0);
                    setAverageRate(totalRate / l.length);
                } else {
                    setAverageRate(0);
                }
            });
        };
        getLessons();
    }, [teacher.id]);

    return (
        <div className="teacher-item">
            <p>תז: {teacher.id}</p>
            <p>שם: {teacher.name}</p>
            <p>ממוצע דירוג: {averageRate.toFixed(2)}</p>
            <button onClick={() => onRemove(teacher.id)}>הסר מורה</button>
            <button onClick={() => onViewFeedback(teacher.id)}>צפה בפידבקים</button>
        </div>
    );
};

export default Teacher;

