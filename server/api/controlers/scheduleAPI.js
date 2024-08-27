const express = require("express");
const {
  insertSchedule,
  selectSchedule,
  selectScheduleById,
  updateSchedule,
  deleteSchedule,
} = require("../../bl/queries/Q_schedule");

const app = express.Router();

// GET all schedules
app.get("/schedules", (req, res) => {
  selectSchedule((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

// GET schedule by ID
app.get("/schedules/:id", (req, res) => {
  const scheduleId = req.params.id;
  selectScheduleById(scheduleId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json(results[0]);
  });
});

// POST new schedule
app.post("/schedules", (req, res) => {
  const { id_teacher, date, hour } = req.body;
  insertSchedule(id_teacher, date, hour, (err, insertId) => {
    if (err) {
      return res.status(500).json({ error: "Database insert error" });
    }
    res.json({ id: insertId });
  });
});

app.post('/api/schedule/:teacherId/add', async (req, res) => {
  const { teacherId } = req.params;
  const { schedule } = req.body;

  try {
      // הוספת הנתונים החדשים ל-Database
      for (const slot of schedule) {
          const { date, hour } = slot;
          await db.query(
              'INSERT INTO schedule (teacher_id, date, hour) VALUES (?, ?, ?)',
              [teacherId, date, hour]
          );
      }
      res.status(200).json({ message: 'Schedule added successfully' });
  } catch (error) {
      console.error('Error adding schedule:', error);
      res.status(500).json({ message: 'Failed to add schedule' });
  }
});


// PUT update schedule
app.put("/schedules/:id", (req, res) => {
  const scheduleId = req.params.id;
  const { columnName, newData } = req.body;
  updateSchedule(scheduleId, columnName, newData, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Database update error" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json({ affectedRows });
  });
});

// DELETE schedule
app.delete("/schedules/:id", (req, res) => {
  const scheduleId = req.params.id;
  deleteSchedule(scheduleId, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Database delete error" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json({ affectedRows });
  });
});

module.exports = app;
