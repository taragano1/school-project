const express = require("express");
const cors = require('cors');
const app = express();
const port = 8000;

// Import the routes
const usersAPI = require("../controlers/userAPI");
const teacherAPI = require("../controlers/teacherAPI");
const studentAPI = require("../controlers/studentAPI");
const lessonAPI = require("../controlers/lessonAPI");
const genderAPI = require("../controlers/genderAPI");
const passwordAPI = require("../controlers/passwordAPI");
const specializationAPI = require("../controlers/specializationAPI");
const teacher_docAPI = require("../controlers/teacher_docAPI");

// Import the routes
//const usersAPI = require("./userAPI");
//const teacherAPI = require("./teacherAPI");
//const studentAPI = require("./studentAPI");
//const lessonAPI = require("./lessonAPI");
//const genderAPI = require("./genderAPI");
//const passwordAPI = require("./passwordAPI");
//const specializationAPI = require("../controlers/specializationAPI");
//const teacher_docAPI = require("./teacher_docAPI");

app.use(express.json());
app.use(cors());

// Use the routes with appropriate base paths
app.use('/api', usersAPI);
app.use('/api', teacherAPI);
app.use('/api', studentAPI);
app.use('/api', lessonAPI);
app.use('/api', genderAPI);
app.use('/api', specializationAPI);
app.use('/api', teacher_docAPI);
app.use('/api', passwordAPI);



app.get("/", (req, res) => {
    return res.status(200).send("hello momo");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

