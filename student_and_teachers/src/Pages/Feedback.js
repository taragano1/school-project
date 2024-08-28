import React, { useState, useEffect } from "react";
import { Update, Read } from "../CRUD";
import './Feedback.css';

const Feedback = ({ lessonId, sender, show }) => {
    const [rating, setRating] = useState(0);
    const [textFeedback, setTextFeedback] = useState("");
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        if (show) {
            const getLesson = async () => {
                try {
                    const fetchedLesson = await Read(`/lesson/${lessonId}`);
                    setLesson(fetchedLesson);
                    setRating(fetchedLesson.rating || 0);
                    setTextFeedback(fetchedLesson.feedback || "");
                } catch (error) {
                    console.error("Error fetching lesson data:", error);
                }
            };
            getLesson();
        }
    }, [lessonId, show]);

    if (!show) {
        return null; // Don't render the component if show is false
    }

    const handleRatingClick = (newRating) => {
        if (sender) {
            setRating(newRating);
        }
    };

    const handleSubmit = async () => {
        if (!sender) {
            return;
        }

        if (lesson) {
            const updatedLesson = {
                ...lesson,
                rating,
                feedback: textFeedback
            };

            try {
                await Update(`/lesson/${lessonId}`, updatedLesson);
                alert("Feedback submitted successfully!");
            } catch (error) {
                console.error("Error updating feedback:", error);
                alert("Failed to submit feedback.");
            }
        }
    };

    return (
        <div className="feedback-container">
            <h1>Feedback</h1>
            <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${rating >= star ? "filled" : ""}`}
                        onClick={() => handleRatingClick(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                value={textFeedback}
                onChange={(e) => setTextFeedback(e.target.value)}
                placeholder="Enter your feedback..."
                rows={4}
                className="feedback-textarea"
                disabled={!sender}
            />
            <button onClick={handleSubmit} className="submit-button" disabled={!sender}>Submit Feedback</button>
        </div>
    );
};

export default Feedback;

