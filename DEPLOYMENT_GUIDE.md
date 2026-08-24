# 🚀 Free Deployment Guide - Expense Tracker Friends

This project is a **MERN Stack Application** (MongoDB, Express.js, React.js, Node.js). 

---

## 🛠️ Step 1: Free MongoDB Database (MongoDB Atlas)
Since local MongoDB (`localhost:27017`) won't work on cloud servers, set up a **100% Free MongoDB Atlas Database** (takes 3 minutes):

1. Go to **[mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)** and sign up / log in.
2. Click **Create a Database** and select the **M0 Free Tier**.
3. Choose any region (e.g. AWS N. Virginia or Mumbai) and click **Create**.
4. **Create a Database User**:
   - Username: `admin` (or your choice)
   - Password: `yourpassword123` (Save this password!)
5. **Network Access (IMPORTANT)**:
   - Go to **Network Access** tab on the left sidebar.
   - Click **Add IP Address** -> Select **Allow Access from Anywhere (`0.0.0.0/0`)** -> Click **Confirm**.
6. **Get Connection String**:
   - Go to **Database** -> Click **Connect** -> Choose **Drivers**.
   - Copy your connection string. It looks like:
     `mongodb+srv://admin:yourpassword123@cluster0.abcde.mongodb.net/expense-db?retryWrites=true&w=majority`

---

## 🌟 Option 1: Fullstack Deployment on Render (RECOMMENDED for College Demo)
Deploy backend and frontend together on a **single free URL** on [Render.com](https://render.com).

### Instructions:
1. Push your project to **GitHub**.
2. Go to **[dashboard.render.com](https://dashboard.render.com)** and sign in with GitHub.
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository (`expense-tracker-friends`).
5. Configure the service:
   - **Name**: `expense-tracker-friends`
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
6. Add **Environment Variables**:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `mongodb+srv://admin:yourpassword123@cluster0.abcde.mongodb.net/expense-db?retryWrites=true&w=majority`
7. Click **Create Web Service**. Render will automatically build the React frontend and run the Node backend.
8. Once finished, you'll get your live link: `https://expense-tracker-friends.onrender.com`.

> ⚠️ **College Presentation Tip**: Render's free tier goes to sleep after 15 minutes of inactivity. Open your website link **2 minutes before your presentation** so the server wakes up!

---

## ⚡ Option 2: Split Deployment (Vercel Frontend + Render Backend)

### Part A: Backend on Render
1. Follow Option 1 on Render, but set Build Command to `npm install` and Start Command to `node index.js`.
2. Get your backend URL (e.g., `https://expense-backend.onrender.com`).

### Part B: Frontend on Vercel
1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
2. Click **Add New** -> **Project** -> Import your repository.
3. Edit Settings:
   - **Root Directory**: `client`
   - **Framework Preset**: `Create React App`
4. Add **Environment Variable**:
   - `REACT_APP_API_URL`: `https://expense-backend.onrender.com`
5. Click **Deploy**. Your frontend will be live in 30 seconds!

---

## 🚨 Option 3: Emergency Backup Plan (Localtunnel / Ngrok)
If you face any issues deploying to the cloud before your presentation tomorrow, you can run the app on your laptop and share a live HTTPS URL over college Wi-Fi:

1. Start backend locally: `npm start` (in root)
2. Start frontend locally: `cd client && npm start`
3. Expose your local app using Localtunnel:
   ```bash
   npx localtunnel --port 3000
   ```
4. You will get a live URL (e.g., `https://curious-cats-dance.loca.lt`) that works on any phone or laptop!
