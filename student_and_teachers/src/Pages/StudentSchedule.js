import React, { useState } from 'react';
import './StudentSchedule.css'; // קובץ CSS לעיצוב עם שם StudentSchedule.css

const NewComponent = () => {
    const [profession, setProfession] = useState('');
    const [items, setItems] = useState(Array.from({ length: 10 }, (_, index) => index + 1));
    const [itemsToRemove, setItemsToRemove] = useState(Array.from({ length: 10 }, (_, index) => index + 1));

    const handleSaveChanges = () => {
        // פונקציה לשמירת השינויים - ניתן להוסיף פה לוגיקה נוספת לפי הצורך
        console.log('Changes saved!');
    };

    const handleRemoveItem = (indexToRemove) => {
        const updatedItems = itemsToRemove.filter((item, index) => index !== indexToRemove);
        setItemsToRemove(updatedItems);
    };

    return (
        <div className="component">
            {/* תגית ו-TEXTBOX למילוי */}
            <label htmlFor="profession">מקצוע:</label>
            <input
                type="text"
                id="profession"
                name="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
            />
            <br /><br />

            {/* טבלה עם כפתורים לבחירה */}
            <table>
                <thead>
                    <tr>
                        <th>רשימת מורים</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                יישראלה ישראלי
                                <button className="button">בחר</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* טבלה עם כפתורים להסרה */}
            <table>
                <thead>
                    <tr>
                        <th>השיעורים שנבחרו</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsToRemove.map((item, index) => (
                        <tr key={index}>
                            <td>
                                שיעור מתמתיקה
                                <button className="button" onClick={() => handleRemoveItem(index)}>הסר</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* כפתור לשמירת השינויים */}
            <button className="button" onClick={handleSaveChanges}>שמור שינויים</button>
        </div>
    );
};

// דף המוצג בנפרד
const StudentSchedule = () => {
    return (
        <div className="container">
            <h1>Student Schedule</h1>
            <NewComponent />
        </div>
    );
};

export default StudentSchedule;
