const express = require("express");
const cors = require("cors");
const shoolRoute = require("./routes/index.js");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

// middleware
app.use(cors());
app.use(express.json());
app.use("/", shoolRoute);

app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h1 style="color: #2c3e50;">🏫 School Management API</h1>
      <p style="font-size: 18px; color: #34495e;">
        Welcome to the <strong>School Management API</strong>. This API allows users to 
        add schools and retrieve a sorted list of schools based on their proximity 
        to a given location.
      </p>
      
      <h2 style="color: #16a085;">📌 Available Endpoints:</h2>
      <ul style="list-style-type: none; padding: 0; font-size: 16px; color: #2c3e50;">
        <li>🚀 <strong>POST /addSchool</strong> - Add a new school.</li>
        <li>📍 <strong>GET /listSchools?lat=YOUR_LAT&lon=YOUR_LON</strong> - 
            Get a list of schools sorted by distance.
            <p>example:http://localhost:4000/listSchools?lat=22.5726&lon=88.3639</p></li>
      </ul>
      
      <p style="font-size: 16px; color: #7f8c8d;">
        📖 For detailed documentation, check the <strong>README</strong>.
      </p>
    </div>
  `);
});

module.exports = app;
