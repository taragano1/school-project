import React, { useState, useEffect } from "react";
import { Update, Read } from "../CRUD"; // Import the Read function to fetch lesson data
import './Feedback.css';

const Feedback = ({ lessonId, sender }) => {
    const [rating, setRating] = useState(0);
    const [textFeedback, setTextFeedback] = useState("");
    const [lesson, setLesson] = useState(null);
    

    // Fetch the lesson details when the component mounts
    useEffect(() => {
        const getLesson = async () => {
            try {
                const fetchedLesson = await Read(`/lesson/${lessonId}`);
                setLesson(fetchedLesson);
                setRating(fetchedLesson.rating || 0); // Initialize rating from fetched lesson
                setTextFeedback(fetchedLesson.feedback || ""); // Initialize feedback from fetched lesson
            } catch (error) {
                console.error("Error fetching lesson data:", error);
            }
        };
        getLesson();
    }, [lessonId]);

    const handleRatingClick = (newRating) => {
        if (sender) {
            setRating(newRating);
        }
    };

    const handleSubmit = async () => {
        if (!sender) {
            return; // Do nothing if sender is false
        }

        if (lesson) {
            // Update the lesson object with new feedback and rating
            const updatedLesson = {
                ...lesson,
                rating,
                feedback: textFeedback
            };

            try {
                // Update the feedback on the server
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
