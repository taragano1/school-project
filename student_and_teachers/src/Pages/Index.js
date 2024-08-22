import React from "react";
import { Link } from "react-router-dom";
export default function Index() {
  return (
    <div>
      <h1>Index</h1>
      <Link to="/LogIn">Log In</Link> <br/>
      <Link to="/student/main">MainScreenStudent </Link><br/>
      <Link to="/teacher/main">MainScreenTeacher </Link><br/>
      <Link to="/student/signIn">SignInStudent </Link><br/>
      <Link to="/teacher/signIn">SignInTeacher </Link><br/>
      <Link to="/student/schedule">StudentSchedule </Link><br/>
      <Link to="/teacher/schedule">TeacherSchedule </Link><br/>
      <Link to="/student/add-feedback">Add-feedback </Link><br/>
      <Link to="/manager/main">MainScreenManager </Link><br/>
      <Link to="/manager/all-feedbacks">AllFeedbacks </Link><br/>
      <Link to="/student/history">History </Link><br/>
      <Link to="/teacher/specialization">Specialization </Link><br/>
    </div>
  );
}

