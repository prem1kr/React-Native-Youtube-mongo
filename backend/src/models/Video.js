const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true, unique: true },
    title: { type: String },
    thumbnail: { type: String },
    channel: { type: String },
    channelLogo: { type: String }, 
    duration: { type: Number },
    views: { type: Number },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
