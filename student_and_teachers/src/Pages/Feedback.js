import React, { useState } from "react";
import './Feedback.css';

const Feedback = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
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
            <textarea rows="4" cols="50"></textarea>
            <button className="submit-button">שלח משוב</button>
        </div>
    );
};

export default Feedback;
