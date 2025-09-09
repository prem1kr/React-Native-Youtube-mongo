require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const videosRoute = require("./routes/videos.js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI);

app.use("/api/videos", videosRoute);

app.get("/", (req, res) => res.send("Video metadata server is running"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
