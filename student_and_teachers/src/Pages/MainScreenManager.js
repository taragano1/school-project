import React from "react";
import './MainScreenManager.css';

const MainScreenManager = () => {
    const generateRandomDetails = () => {
        const teachers = [
            "יואב כהן",
            "דנה לוי",
            "רון יעקב",
            "אורית ישראלי",
            "עמית כהן",
            "שירה מזרחי",
            "אייל בן דוד",
            "נועם רז",
            "ליאת אמיר",
            "רועי כהן"
        ];

        const ratings = ["4.5", "3.8", "4.0", "4.7", "3.6", "4.2", "4.8", "3.9", "4.1", "4.3"];

        return teachers.map((teacher, index) => ({
            teacher,
            rating: ratings[index]
        }));
    };

    const details = generateRandomDetails();

    return (
        <div className="main-screen-manager-container">
            <h1>ישראל ישראלי</h1>
            <button className="profile-button">פרופיל מנהל</button>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>מורה</th>
                            <th>דירוג משוב</th>
                            <th>מערכת מורה</th>
                            <th>לצפיה במשוב</th>
                            <th>להסרת מורה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.teacher}</td>
                                <td>{detail.rating}</td>
                                <td><button>מערכת מורה</button></td>
                                <td><button>לצפיה במשוב</button></td>
                                <td><button>להסרת מורה</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainScreenManager;
