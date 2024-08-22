import React, { useState } from "react";
export default function MainScreenTeacher() {
    return (
        <div className="container">
          <h1 className="title">שלום ישראל</h1>
          <div className="content">
            <div className="buttons">
              <button>פרופיל מורה</button>
              <button>קביעת מערכת לשבוע הבא</button>
              <button>עדכון פרופיל</button>
              <button>לצפיית שיעורים שעברו</button>
            </div>
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
                    <td> שיעור תורה<button>למשוב </button></td>
                    <td> שיעור נביא<button>למשוב</button></td>
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
                    <td> שיעור תורה<button>למשוב </button></td>
                    <td> שיעור נביא<button>למשוב</button></td>
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
                    <td> שיעור תורה<button>לביטול השיעור </button></td>
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
                    <td> שיעור תורה<button>לביטול השיעור </button></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>13:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>14:00</td>
                    <td></td>
                    <td> שיעור תורה<button>לביטול השיעור </button></td>
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
                    <td> שיעור תורה<button>לביטול השיעור </button></td>
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
                    <td>v</td>
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
                    <td></td>
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
                    <td> שיעור תורה<button>לביטול השיעור </button></td>
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
          </div>
        </div>
      );

}