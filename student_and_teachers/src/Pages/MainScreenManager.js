import React, { useEffect, useState } from "react";
import './MainScreenManager.css';
import { useParams } from "react-router-dom";
import { Read, Update } from "../CRUD";
import Teacher from "../components/Teacher";
import { useNavigate } from "react-router-dom";

const MainScreenManager = () => {
    const { id } = useParams();
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();  

    useEffect(() => {
        const getTeachers = () => {
            Read(`/teachers`).then((t) => {
                setTeachers(t);
            });
        };
        getTeachers();
    }, []); 

    const getTeachers = () => {
        Read(`/teachers`).then((t) => {
            setTeachers(t);
        });
    };

    const handleRemove = async (teacherId) => {
        try {
            // הבאת ה-USER מהשרת ושינוי הסטטוס שלו ל-FALSE
            const user = await Read(`/users/${teacherId}`);
            if (user) {
                user.status = false;
                await Update(`/users/${teacherId}`, user);

                // קריאה מחודשת לפונקציה getTeachers לעדכון הרשימה
                getTeachers();
            }
        } catch (error) {
            console.error("Error removing teacher:", error);
        }
    };

    const handleViewFeedback = (teacherId) => {
        console.log("Viewing feedback for teacher with ID:", teacherId);
        navigate(`/manager/all-feedbacks/${id}`);
    };

    const handleProfileClick = () => {
        alert("כפתור זה אינו מאופשר כרגע.");
    };

    return (
        <div className="main-screen-manager-container">
            <h1>מסך מנהל</h1>
            <button className="profile-button" onClick={handleProfileClick}>
                פרופיל מנהל
            </button>

            <div className="teachers-list">
                {teachers.map((teacher) => (
                    <Teacher 
                        key={teacher.id} 
                        teacher={teacher} 
                        onRemove={handleRemove} 
                        onViewFeedback={handleViewFeedback} 
                    />
                ))}
            </div>
        </div>
    );
};

export default MainScreenManager;



