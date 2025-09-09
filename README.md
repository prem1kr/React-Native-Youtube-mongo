
This project is a **full-stack React Native + Node.js app** that plays YouTube videos.  
Video **IDs are stored in MongoDB**, while metadata (title, channel, thumbnail, duration) is fetched from the **YouTube Data API**.  

---

## 🚀 Goal
Build a **tiny React Native app** that:
- Lists YouTube videos (thumbnail + title + channel).
- Plays videos inside the app when tapped.
- Fetches video metadata dynamically from the YouTube API.

---

## 📂 Project Structure
```

MY-FULLSTACK-PROJECT/
│
├── backend/          # Node.js + Express + MongoDB server
│   ├── src/
│   │   ├── config/   # DB connection
│   │   ├── controllers/ # Logic for fetching/storing videos
│   │   ├── models/   # Mongoose models
│   │   ├── routes/   # API routes (/api/videos)
│   │   └── index.js  # Express app entry
│   ├── seed.js       # Script to seed 10 YouTube video IDs
│   └── .env          # MongoDB URI + API keys
│
├── frontend/         # React Native (Expo) app
│   ├── app/          # Expo Router screens
│   │   ├── video/    # Video detail screen (\[id].jsx)
│   │   ├── \_layout.jsx
│   │   └── index.jsx # Video list screen
│   ├── components/   # UI components (VideoCard, VideoPlayer)
│   ├── hooks/        # Custom hooks (useFetchVideo.js)
│   ├── services/     # API client (axios)
│   ├── assets/       # App assets
│   └── App.jsx       # App entry
│
└── README.md

````

---

## ⚙️ Tech Stack
- **Frontend**: React Native (Expo), React Native YouTube player / WebView
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB (seeded with 10 YouTube IDs)
- **API**: YouTube Data API v3

---

## 🛠️ Setup Instructions

### 1. Clone Repos
```bash
git clone https://github.com/prem1kr/React-Native-Youtube-mongo.git
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_url
YOUTUBE_API_KEY=your_youtube_api_key
PORT=4000
```

Seed database with 10 YouTube video IDs:

```bash
node seed.js
```

Run server:

```bash
npm start
```

Server will run at: `http://localhost:4000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start Expo app:

```bash
npm run web   # for web
npm run android  # for Android emulator/device
npm run ios      # for iOS simulator
```

---

## 🌐 API Endpoints

* `GET /api/videos` → Fetches enriched video metadata from MongoDB + YouTube API.

Example response:

```json
[
  {
    "videoId": "abcd1234",
    "title": "Cool Video",
    "channel": "Tech Channel",
    "thumbnail": "https://i.ytimg.com/vi/abcd1234/hqdefault.jpg",
    "duration": "PT5M10S"
  }
]
```


---

👉 Do you want me to also include the **exact MongoDB seed script example** in the README (with 10 video IDs), so reviewers can run it directly?
```
