require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const videosRoute = require("./routes/videos.js");

const app = express();

const allowedOrigins = [
  "http://localhost:8081",   
  "http://localhost:3000",   
  "https://mongotube.onrender.com" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI);

// Routes
app.use("/api/videos", videosRoute);

app.get("/", (req, res) => res.send("Video metadata server is running"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
