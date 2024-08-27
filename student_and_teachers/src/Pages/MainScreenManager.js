import React, { useEffect, useState } from "react";
import './MainScreenManager.css';
import { useParams } from "react-router-dom";
import { Read } from "../CRUD";
import Teacher from "../components/Teacher"; // ייבוא הקומפוננטה Teacher
import { useNavigate } from "react-router-dom";

const MainScreenManager = () => {
    const { id } = useParams();
    let myUser = Read(`/users/${id}`);
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

    const handleRemove = (teacherId) => {
        // הוסיפו כאן את הלוגיקה למחיקת מורה
        console.log("Removing teacher with ID:", teacherId);
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


