import React from "react";
import './History.css';

const History = () => {
    const historyData = [
        { teacher: "יואב כהן", student: "דנה לוי", lessonNum: 1, subject: "מתמטיקה", date: "2024-01-01" },
        { teacher: "רון יעקב", student: "אורית ישראלי", lessonNum: 2, subject: "אנגלית", date: "2024-01-02" },
        { teacher: "עמית כהן", student: "שירה מזרחי", lessonNum: 3, subject: "היסטוריה", date: "2024-01-03" },
        { teacher: "אייל בן דוד", student: "נועם רז", lessonNum: 4, subject: "מדעים", date: "2024-01-04" },
        { teacher: "ליאת אמיר", student: "רועי כהן", lessonNum: 5, subject: "ספרות", date: "2024-01-05" },
        { teacher: "שירה מזרחי", student: "עמית כהן", lessonNum: 6, subject: "אמנות", date: "2024-01-06" },
        { teacher: "נועם רז", student: "אייל בן דוד", lessonNum: 7, subject: "גיאוגרפיה", date: "2024-01-07" },
        { teacher: "רועי כהן", student: "ליאת אמיר", lessonNum: 8, subject: "תנ\"ך", date: "2024-01-08" },
        { teacher: "אורית ישראלי", student: "רון יעקב", lessonNum: 9, subject: "כימיה", date: "2024-01-09" },
        { teacher: "דנה לוי", student: "יואב כהן", lessonNum: 10, subject: "פיזיקה", date: "2024-01-10" }
    ];

    const handleFeedbackClick = (lessonNum) => {
        alert(`משוב עבור שיעור מס' ${lessonNum}`);
    };

    return (
        <div className="history-container">
            <h1>הסטוריית שיעורים</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>מורה</th>
                            <th>תלמיד</th>
                            <th>שיעור מס</th>
                            <th>מקצוע</th>
                            <th>משוב</th>
                            <th>תאריך</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((lesson, index) => (
                            <tr key={index}>
                                <td>{lesson.teacher}</td>
                                <td>{lesson.student}</td>
                                <td>{lesson.lessonNum}</td>
                                <td>{lesson.subject}</td>
                                <td>
                                    <button onClick={() => handleFeedbackClick(lesson.lessonNum)}>
                                        משוב
                                    </button>
                                </td>
                                <td>{lesson.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
