import React from "react";
import './AllFeedBacks.css';

const AllFeedBacks = () => {
    const feedbacks = [
        { lessonNum: 1, studentName: "יואב כהן", date: "2024-01-01", subject: "מתמטיקה", feedback: "שיעור מצוין", rating: 5 },
        { lessonNum: 2, studentName: "דנה לוי", date: "2024-01-02", subject: "אנגלית", feedback: "מעניין מאוד", rating: 4 },
        { lessonNum: 3, studentName: "רון יעקב", date: "2024-01-03", subject: "היסטוריה", feedback: "טוב מאוד", rating: 4 },
        { lessonNum: 4, studentName: "אורית ישראלי", date: "2024-01-04", subject: "מדעים", feedback: "מאתגר ומלמד", rating: 5 },
        { lessonNum: 5, studentName: "עמית כהן", date: "2024-01-05", subject: "ספרות", feedback: "מענין", rating: 4 },
        { lessonNum: 6, studentName: "שירה מזרחי", date: "2024-01-06", subject: "אמנות", feedback: "כיף מאוד", rating: 5 },
        { lessonNum: 7, studentName: "אייל בן דוד", date: "2024-01-07", subject: "גיאוגרפיה", feedback: "נחמד", rating: 3 },
        { lessonNum: 8, studentName: "נועם רז", date: "2024-01-08", subject: "תנ\"ך", feedback: "מעמיק", rating: 4 },
        { lessonNum: 9, studentName: "ליאת אמיר", date: "2024-01-09", subject: "כימיה", feedback: "מאוד טוב", rating: 4 },
        { lessonNum: 10, studentName: "רועי כהן", date: "2024-01-10", subject: "פיזיקה", feedback: "מאתגר", rating: 5 }
    ];

    return (
        <div className="all-feedbacks-container">
            <label className="title-label">ישראל ישראלי</label>
            <h1>All Feedbacks</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>שיעור מס</th>
                            <th>שם התלמיד</th>
                            <th>תאריך השיעור</th>
                            <th>מקצוע</th>
                            <th>משוב</th>
                            <th>דירוג</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback, index) => (
                            <tr key={index}>
                                <td>{feedback.lessonNum}</td>
                                <td>{feedback.studentName}</td>
                                <td>{feedback.date}</td>
                                <td>{feedback.subject}</td>
                                <td>{feedback.feedback}</td>
                                <td>{feedback.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllFeedBacks;
