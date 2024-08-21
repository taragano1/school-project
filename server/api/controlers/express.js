const express = require("express");
const app = express();
const port = 5000;

// Import the routes
const usersAPI = require("../controlers/userAPI");
const teacherAPI = require("../controlers/teacherAPI");
const studentAPI = require("../controlers/studentAPI");
const lessonAPI = require("../controlers/lessonAPI");
const genderAPI = require("../controlers/genderAPI");
const specializationAPI = require("../controlers/specializationAPI");

app.use(express.json());
// app.use(cors());

// Use the routes with appropriate base paths
app.use('/api/users', usersAPI);
app.use('/api/teachers', teacherAPI);
app.use('/api/students', studentAPI);
app.use('/api/lessons', lessonAPI);
app.use('/genders', genderAPI);
// app.use(genderAPI);
app.use('/specializations', specializationAPI);
// app.use( specializationAPI);


app.get("/", (req, res) => {
    return res.status(200).send("hello momo");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
