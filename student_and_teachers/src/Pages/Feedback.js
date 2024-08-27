import React, { useState } from "react";
import { UpdateFeedback } from "../CRUD"; // Import the UpdateFeedback function from your CRUD utility
import './Feedback.css';

const Feedback = ({ lessonId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    const handleRating = (value) => {
        setRating(value);
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = () => {
        // Update the feedback using the CRUD utility function
        UpdateFeedback(lessonId, feedback)
            .then((response) => {
                if (response.affectedRows > 0) {
                    alert("Feedback submitted successfully");
                    onClose(); // Close the feedback form or navigate away
                } else {
                    alert("Failed to submit feedback");
                }
            })
            .catch((error) => {
                console.error("Error submitting feedback:", error);
                alert("Error submitting feedback");
            });
    };

    return (
        <div className="feedback-container">
            <h1>Feedback</h1>
            <label>דירוג השיעור</label>
            <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={index < rating ? "star filled" : "star"}
                        onClick={() => handleRating(index + 1)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <label>פירוט</label>
            <textarea
                rows="4"
                cols="50"
                value={feedback}
                onChange={handleFeedbackChange}
            ></textarea>
            <button className="submit-button" onClick={handleSubmit}>
                שלח משוב
            </button>
        </div>
    );
};

export default Feedback;
