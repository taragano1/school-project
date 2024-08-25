import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AllFeedBacks from './Pages/AllFeedBacks';
import Feedback from './Pages/Feedback';
import History from './Pages/History';
import LogIn from './Pages/LogIn';
import MainScreenManager from './Pages/MainScreenManager';
import MainScreenStudent from './Pages/MainScreenStudent';
import MainScreenTeacher from './Pages/MainScreenTeacher';
import SignInTeacher from './Pages/SignInTeacher';
import SignInStudent from './Pages/SignInStudent';
import Specialization from './Pages/Specialization';
import StudentSchedule from './Pages/StudentSchedule';
import TeacherSchedule from './Pages/TeacherSchedule';
import Index from './Pages/Index';

function App() {
  // const isAuthenticated = localStorage.getItem('myUser');

  return (
    <div>
      <Routes>
        <Route index element={<Navigate to="/index" />} />
        <Route path="login" element={<LogIn />} />
        <Route path="index" element={<Index />} />
        <Route path="teacher/signIn" element={<SignInTeacher />} />
        <Route path="student/signIn" element={<SignInStudent />} />

        {/* {isAuthenticated && ( */}
          <>
            <Route path="teacher/main" element={<MainScreenTeacher />} />
            <Route path="teacher/main/:id" element={<MainScreenTeacher />} />
            <Route path="teacher/history" element={<History />} />
            <Route path="teacher/specialization" element={<Specialization />} />
            <Route path="teacher/schedule" element={<TeacherSchedule />} />
            <Route path="student/main" element={<MainScreenStudent />} />
            <Route path="student/main/:id" element={<MainScreenStudent />} />
            <Route path="student/add-feedback" element={<Feedback />} />
            <Route path="student/history" element={<History />} />
            <Route path="student/schedule" element={<StudentSchedule />} />
            <Route path="manager/main" element={<MainScreenManager />} />
            <Route path="manager/main/:id" element={<MainScreenManager />} />
            <Route path="manager/all-feedbacks" element={<AllFeedBacks />} />
          </>
        {/* )} */}
      </Routes>
    </div>
  );
}

export default App;
