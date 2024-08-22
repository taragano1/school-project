const express = require("express");
const {
  insertUsers,
  selectUsersById,
  selectUsersByEmail,
} = require("../../dal/queries/Q_users");

const app = express.Router();

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  selectUsersById(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

app.get("/users/:email", (req, res) => {
  const userEmail = req.params.email;
  selectUsersByEmail(userEmail, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

app.post("/users", (req, res) => {
  const { id, fname, lname, email, phone, city, birthday, address, gender_id } = req.body;
  insertUsers(id, fname, lname, email, phone, city, birthday, address, gender_id, (err, insertId) => {
    if (err) {
      return res.status(500).json({ error: "Database insert error" });
    }
    res.json({ id: insertId });
  });
});

module.exports = app;


// app.put("/users/:id", (req, res) => {
//     const userId = req.params.id;
//     const { columnName, newData } = req.body; 
//     updateUser(userId, columnName, newData, (err, affectedRows) => {
//       if (err) {
//         return res.status(500).json({ error: "Database update error" });
//       }
//       res.json({ affectedRows });
//     });
//   });


// app.delete("/users/:id", (req, res) => {
//   const userId = req.params.id;
//   deleteUser(userId, (err, affectedRows) => {
//     if (err) {
//       return res.status(500).json({ error: "Database delete error" });
//     }
//     res.json({ affectedRows });
//   });
// });
// module.exports = app;
// const express = require("express");
// const selectUsers = require("../../dal/queries/Q_users").selectUsers;
// const selectUsersById = require("../../dal/queries/Q_users").selectUsersById;
// const updateUser = require("../../dal/queries/Q_users").updateUser;
// const insertUsers = require("../../dal/queries/Q_users").insertUsers;
// const deleteUser = require("../../dal/queries/Q_users").deleteUser;


// const app = express.Router();

// app.get("/users", (req, res) => {
//   selectUsers((err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Database query error" });
//     }
//     // If results are found, return them as JSON response
//     res.json(results);
//   });
// });

