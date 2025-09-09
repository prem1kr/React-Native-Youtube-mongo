import axios from "axios";

const SERVER_BASE = "https://mongotube-backend.onrender.com"; 
// NOTE: On Android emulator use 10.0.2.2 to reach host machine. On iOS simulator use localhost.
// Replace with your server IP or public URL when testing on a real device.

export async function fetchVideos() {
  const resp = await axios.get(`${SERVER_BASE}/api/videos`);
  return resp.data;
}
