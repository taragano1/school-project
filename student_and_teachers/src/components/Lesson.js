import React from 'react';

const Lesson = ({ lesson }) => {
    const { lessonNumber, studentName, lessonDate, subject, feedback, rating } = lesson;

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <div className="lesson-container">
            <p>שיעור מס': {lessonNumber}</p>
            <p>שם התלמיד: {studentName}</p>
            <p>תאריך השיעור: {lessonDate}</p>
            <p>מקצוע: {subject}</p>
            <p>משוב: {feedback}</p>
            <p>דירוג: {renderStars(rating)}</p>
        </div>
    );
};

export default Lesson;
