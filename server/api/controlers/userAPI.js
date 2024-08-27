const express = require("express");
const app = express.Router(); // הוספת שורה זו כדי להגדיר את app כ-Router של Express
const { deleteUser, selectUsersByEmail, selectUsersById, updateUser, insertUsers,checkUserIdExists } = require("../../bl/queries/Q_users"); // הוספת פונקציות חסרות
const { selectPasswordById } = require("../../bl/queries/Q_passwords");
const bcrypt = require("bcrypt"); // לצורך השוואת סיסמאות
// Middleware כדי להבטיח שהתוכן של הבקשה הוא JSON
app.use(express.json());

// GET request לקבלת משתמש לפי מזהה
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  selectUsersById(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

// GET request לקבלת משתמש לפי אימייל
app.get("/users/email/:email", (req, res) => {
  const userEmail = req.params.email; 
  selectUsersByEmail(userEmail, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

// POST request להוספת משתמש חדש
app.post("/users", (req, res) => {
  console.log("postsignin-userapi")
  const { id, fname, lname, email, phone, city, birthday, address, gender_id,typeOfUser,status } = req.body;

  // בדיקה אם כל הנתונים הנדרשים קיימים
  if (!id || !fname || !lname || !email || !phone || !city || !birthday || !address || !gender_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // בדיקה אם ה-ID כבר קיים
  checkUserIdExists(id, (err, exists) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (exists) {
      return res.status(409).json({ error: "ID already exists" });
    }

    // הכנסת המשתמש החדש אם ה-ID לא קיים
    insertUsers(id, fname, lname, email, phone, city, birthday, address, gender_id,typeOfUser,status, (err, insertId) => {
      if (err) {
        return res.status(500).json({ error: "Database insert error" });
      }
      res.json({ id: insertId });
    });
  });
});


// PUT request לעדכון פרטי משתמש
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { columnName, newData } = req.body; 
  updateUser(userId, columnName, newData, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Database update error" });
    }
    res.json({ affectedRows });
  });
});

// DELETE request למחיקת משתמש
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  deleteUser(userId, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Database delete error" });
    }
    res.json({ affectedRows });
  });
});


//LOGIN
app.get("/login", (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // שלב 1: חיפוש משתמש לפי אימייל
  selectUsersByEmail(email, (err, userResults) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResults[0];
    const userId = user.id;

    // שלב 2: קבלת הסיסמא עבור ה-ID של המשתמש
    selectPasswordById(userId, (err, passwordResults) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      if (passwordResults.length === 0) {
        return res.status(404).json({ error: "Password not found" });
      }

      const storedPassword = passwordResults[0].password;

      // שלב 3: השוואת הסיסמאות
      bcrypt.compare(password, storedPassword, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: "Error comparing passwords" });
        }
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid password" });
        }

        // שלב 4: החזרת פרטי המשתמש אם הסיסמאות תואמות
        res.json({ message: "Login successful", user });
      });
    });
  });
});


module.exports = app;
