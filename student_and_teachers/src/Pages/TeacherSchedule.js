import React from 'react';
import './TeacherSchedule.css'; // קובץ CSS לעיצוב עם שם TeacherSchedule.css

const TeacherSchedule = () => {
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
                        <tr>
                            <td>08:00</td>
                            <td></td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td className="lesson">v</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>09:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td className="lesson">v</td>
                        </tr>
                        <tr>
                            <td>10:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>11:00</td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>12:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>13:00</td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>14:00</td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>15:00</td>
                            <td></td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>16:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>17:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>18:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>19:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>20:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="lesson">v</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>21:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>22:00</td>
                            <td className="lesson">v</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className="save-button">לשמירת הישנויים</button>
        </div>
    );
};

export default TeacherSchedule;
