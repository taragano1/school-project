import './AllFeedBacks.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Read } from "../CRUD";
import Lesson from '../components/Lesson'; // Import the Lesson component

const AllFeedBacks = () => {
    const { id } = useParams();
    let myUser = Read(`/users/${id}`);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const getLessons = () => {
            Read(`/lessons/teacher/${id}`).then((l) => {
                setLessons(l);
            });
        };
        getLessons();
    }, []);

    return (
        <div className="all-feedbacks-container">
            <label className="title-label">myUser.lname </label>
            <h1>All Feedbacks</h1>
            <div className="table-container">
                {lessons.map((lesson, index) => (
                    <Lesson key={index} lesson={lesson} />
                ))}
            </div>
        </div>
    );
};

export default AllFeedBacks;

