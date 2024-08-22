import React, { useState } from "react";
import './Specialization.css';

const Specialization = () => {
    const [specializations, setSpecializations] = useState([
        { name: "מתמטיקה", elementary1: "V", elementary2: "X", highSchool: "V", degree: "X" },
        { name: "אנגלית", elementary1: "X", elementary2: "V", highSchool: "X", degree: "V" },
        { name: "היסטוריה", elementary1: "V", elementary2: "V", highSchool: "X", degree: "X" },
        { name: "מדעים", elementary1: "X", elementary2: "X", highSchool: "V", degree: "V" },
        { name: "ספרות", elementary1: "V", elementary2: "X", highSchool: "X", degree: "V" },
        { name: "אמנות", elementary1: "X", elementary2: "V", highSchool: "V", degree: "X" },
        { name: "גיאוגרפיה", elementary1: "V", elementary2: "V", highSchool: "X", degree: "X" },
        { name: "תנ\"ך", elementary1: "X", elementary2: "X", highSchool: "V", degree: "V" },
        { name: "כימיה", elementary1: "V", elementary2: "X", highSchool: "X", degree: "V" },
        { name: "פיזיקה", elementary1: "X", elementary2: "V", highSchool: "V", degree: "X" },
    ]);

    return (
        <div className="specialization-container">
            <h1>Specialization</h1>
            <h2>השיעורים שלי</h2>
            <div className="form-container">
                <label>שם המקצוע:</label>
                <input type="text" />
                <div>
                    <label>
                        <input type="checkbox" /> יסודי א-ד
                    </label>
                    <label>
                        <input type="checkbox" /> יסודי ה-ח
                    </label>
                    <label>
                        <input type="checkbox" /> תיכון
                    </label>
                    <label>
                        <input type="checkbox" /> תואר
                    </label>
                </div>
                <button>הוסף</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>שם מקצוע</th>
                        <th>יסודי א-ד</th>
                        <th>יסודי ה-ח</th>
                        <th>תיכון</th>
                        <th>תואר</th>
                    </tr>
                </thead>
                <tbody>
                    {specializations.map((spec, index) => (
                        <tr key={index}>
                            <td>{spec.name}</td>
                            <td>{spec.elementary1}</td>
                            <td>{spec.elementary2}</td>
                            <td>{spec.highSchool}</td>
                            <td>{spec.degree}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button>עדכן</button>
        </div>
    );
};

export default Specialization;
