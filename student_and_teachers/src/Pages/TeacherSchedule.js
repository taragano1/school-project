import React, { useState } from 'react';
import { Update } from "../CRUD";
import './TeacherSchedule.css'; // קובץ CSS לעיצוב עם שם TeacherSchedule.css

const TeacherSchedule = ({ teacherId }) => {
    // לוח זמנים ראשוני ריק
    //מצב  שמחזיק את נתוני לוח הזמנים
    const [schedule, setSchedule] = useState(generateInitialSchedule());

    // פונקציה שמייצרת לוח זמנים ראשוני ריק
    const generateInitialSchedule = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
        let initialSchedule = {};
        days.forEach(day => {
            hours.forEach(hour => {
                initialSchedule[`${day}-${hour}`] = false;
            });
        });
        return initialSchedule;
    };

    // פונקציה לטיפול בלחיצה על תא בלוח הזמנים
    const handleCellClick = (day, hour) => {
        const key = `${day}-${hour}`;
        setSchedule(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    // פונקציה לשמירה
    const handleSave = async () => {
        const scheduleToSave = Object.keys(schedule).filter(key => schedule[key]).map(key => {
            const [date, hour] = key.split('-');
            return { date, hour };
        });
    
        try {
            // שליחת הנתונים לשרת דרך פונקציה `Update` או פונקציה שתבצע הכנסה חדשה
            await Update(`/api/schedule/${teacherId}/add`, { schedule: scheduleToSave });
            alert("Schedule saved successfully!");
        } catch (error) {
            console.error("Error saving schedule:", error);
            alert("Failed to save schedule.");
        }
    };
    

    return (
        <div className="container">
            <h1>Teacher Schedule</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>שעות</th>
                            <th>ראשון</th>
                            <th>שני</th>
                            <th>שלישי</th>
                            <th>רביעי</th>
                            <th>חמישי</th>
                            <th>שישי</th>
                            <th>שבת</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map(hour => (
                            <tr key={hour}>
                                <td>{hour}</td>
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                    <td
                                        key={`${day}-${hour}`}
                                        onClick={() => handleCellClick(day, hour)}
                                        className={schedule[`${day}-${hour}`] ? 'lesson' : ''}
                                    >
                                        {schedule[`${day}-${hour}`] ? 'v' : ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="save-button" onClick={handleSave}>לשמירת השינויים</button>
        </div>
    );
};

export default TeacherSchedule;
