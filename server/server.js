const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test backend
app.get("/", (req, res) => {
  res.send("SportIQ Backend is running!");
});

// Save assessment
app.post("/assessment", async (req, res) => {
  try {
    const {
      name,
      age,
      sport,
      speed,
      agility,
      strength,
      endurance,
      accuracy,
      score,
    } = req.body;

    console.log("Assessment received:", req.body);

    const result = await pool.query(
      `INSERT INTO athletes
      (name, age, sport, speed, agility, strength, endurance, accuracy, score)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [name, age, sport, speed, agility, strength, endurance, accuracy, score],
    );

    console.log("Assessment saved:", result.rows[0]);

    res.status(201).json({
      message: "Assessment saved successfully!",
      athlete: result.rows[0],
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);

    res.status(500).json({
      message: "Failed to save assessment",
      error: error.message,
    });
  }
});

// Get all assessments
app.get("/assessments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM athletes ORDER BY id DESC");

    console.log("Assessments fetched:", result.rows.length);

    res.json(result.rows);
  } catch (error) {
    console.error("ASSESSMENTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch assessments",
      error: error.message,
    });
  }
});

// Get latest assessment
app.get("/latest-athlete", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM athletes ORDER BY id DESC LIMIT 1",
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No assessment found",
      });
    }

    console.log("Latest athlete:", result.rows[0]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("LATEST ATHLETE ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch latest assessment",
      error: error.message,
    });
  }
});

// Get all athletes
app.get("/athletes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM athletes ORDER BY id DESC");

    res.json(result.rows);
  } catch (error) {
    console.error("FETCH ATHLETES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch athletes",
      error: error.message,
    });
  }
});

// Server
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SportIQ Backend running on port ${PORT}`);
});
