# FitPulse PRO — MERN Fitness & Workout Logger

FitPulse PRO is a modern, full-stack MERN (MongoDB Atlas, Express.js, React, Node.js) fitness tracking and workout management web application. It features real-time volume calculations, personalized nutrition targets, AI-driven and curated routine suggestions, dynamic rest timers, and CSV export capabilities.

---

## 📁 Project Architecture & Structure

```
fitpluse-main/
├── .gitignore                   # Root gitignore (blocks .env, node_modules, logs)
├── package.json                 # Root orchestration scripts
├── README.md                    # Project documentation & setup guide
├── client/                      # Frontend Application (React + Vite + Tailwind CSS)
│   ├── .gitignore               # Client-specific ignore
│   ├── index.html               # Single Page Application HTML entry
│   ├── package.json             # React dependencies (React 18, Vite, Lucide Icons)
│   ├── vite.config.js           # Vite dev server with proxy to backend (/api -> 5000)
│   ├── tailwind.config.js       # Tailwind CSS styling configuration
│   └── src/
│       ├── main.jsx             # React DOM root entry
│       ├── App.jsx              # App root component with Auth state routing
│       ├── index.css            # Global styling
│       ├── context/
│       │   └── AuthContext.jsx  # Authentication state (Login, Register, OTP, JWT)
│       ├── utils/
│       │   ├── dateUtils.js     # Timezone-safe date helpers (Monday start of week, local dates)
│       │   └── workoutSuggester.js # Curated routine database & dynamic generator algorithm
│       └── components/
│           ├── AuthView.jsx     # Modern Athletic Auth UI (Sign In, Sign Up, OTP Verification)
│           ├── Dashboard.jsx    # Main Dashboard shell with Sidebar & TopBar
│           ├── Navbar.jsx       # Header navigation bar
│           ├── Sidebar.jsx      # Desktop collapsible & mobile responsive sidebar
│           ├── TopBar.jsx       # Header title & quick actions
│           ├── WorkoutForm.jsx  # Workout session logger with auto-calculated calories
│           ├── WorkoutList.jsx  # Searchable workout history with CSV export & deletion
│           ├── WeeklyProgress.jsx # Weekly volume & calorie charts with goal setting
│           ├── ErrorBoundary.jsx# React error boundary for runtime fault tolerance
│           └── views/
│               ├── OverviewView.jsx           # Dashboard overview, water tracker, quick log
│               ├── WorkoutsView.jsx           # Combined workout creation and history view
│               ├── NutritionView.jsx          # Weight-based nutrition calculator & meal tracker
│               ├── AnalyticsView.jsx          # Workout trends & volume visualization
│               ├── ProfileView.jsx            # User profile, verified badge & target preferences
│               └── WorkoutSuggestionsView.jsx # Curated catalog, dynamic workout generator, timer
└── server/                      # Backend API (Node.js + Express.js + Mongoose)
    ├── .env.example             # Template environment variables
    ├── .env                     # Local environment variables (NEVER COMMITTED)
    ├── .gitignore               # Server-specific ignore (.env, node_modules)
    ├── package.json             # Server dependencies (Express 5, Mongoose 8/9, Bcryptjs, JWT)
    ├── server.js                # Express app entry, routes mounting, CORS & health check
    ├── test-auth-and-models.js  # Automated unit & integrity test suite
    ├── config/
    │   └── db.js                # MongoDB Atlas connection handler with caching & credential masking
    ├── controllers/
    │   ├── authController.js    # Register, OTP verify, Resend OTP, Login, Profile & Nutrition
    │   ├── workoutController.js # CRUD for workouts with user isolation
    │   └── suggestionController.js # Daily routines, dynamic routine generator & batch logger
    ├── middleware/
    │   └── authMiddleware.js    # JWT Bearer token verification & route protection
    ├── models/
    │   ├── User.js              # User model with Bcrypt password hashing & nutrition logic
    │   └── Workout.js           # Workout schema (title, reps, load, sets, duration, calories)
    ├── routes/
    │   ├── authRoutes.js        # Auth API endpoints
    │   ├── workoutRoutes.js     # Workout API endpoints
    │   └── suggestionRoutes.js  # Suggestions API endpoints
    └── utils/
        └── emailService.js      # Nodemailer SMTP with fallback to console OTP for local testing
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas Cluster**: A free M0 or higher cluster on [mongodb.com](https://www.mongodb.com/)

---

### Step 1: Configure MongoDB Atlas Cluster

1. Log into your **MongoDB Atlas** account: [cloud.mongodb.com](https://cloud.mongodb.com).
2. **Network Access (IP Whitelist)**:
   - Go to **Security** > **Network Access** in the left sidebar.
   - Click **Add IP Address**.
   - For local development, choose **Allow Access From Anywhere** (`0.0.0.0/0`) or add your current IP address.
   - Click **Confirm**.
3. **Database User Credentials**:
   - Go to **Security** > **Database Access**.
   - Click **Add New Database User**.
   - Authentication Method: **Password**.
   - Create a username (e.g., `fitpulse_admin`) and a secure password.
   - Database User Privileges: **Read and write to any database**.
   - Click **Add User**.
4. **Copy Connection String**:
   - Go to **Deployment** > **Database**.
   - Click **Connect** on your cluster.
   - Select **Drivers** (Node.js).
   - Copy the connection string format:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials.
   - Add a database name (e.g. `/fitpulse`):
     ```
     mongodb+srv://fitpulse_admin:YourPassword123@cluster0.xxxxx.mongodb.net/fitpulse?retryWrites=true&w=majority
     ```
   *(Note: If your password contains special characters like `@`, `#`, `$`, `%`, ensure they are URL-encoded).*

---

### Step 2: Configure Environment Variables (`server/.env`)

1. Open `server/.env` (created from `server/.env.example`).
2. Add your MongoDB Atlas connection string:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas URI (Update with your credentials)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fitpulse?retryWrites=true&w=majority

# Secret key for signing JWT tokens
JWT_SECRET=fitness_logger_academic_secret_key_2026

# Frontend Client URL for CORS
CLIENT_URL=http://localhost:5173

# Optional: Nodemailer Gmail configuration for email verification
# Leave blank to automatically print 6-digit OTP codes to the terminal console
EMAIL_USER=
EMAIL_PASS=
```

> **Security Note**: Never commit `.env` to GitHub. The root and server `.gitignore` files are pre-configured to strictly ignore all `.env` files.

---

### Step 3: Install Dependencies

From the project root:

```bash
# Install both backend and frontend dependencies
npm run install:all
```

Or install individually:

```bash
cd server
npm install

cd ../client
npm install
```

---

### Step 4: Run the Application

#### Option A: Run Backend and Frontend in Separate Terminals (Recommended)

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```
*Backend runs on `http://localhost:5000`. You will see:*
```
[DATABASE] MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net (Database: fitpulse)
Server running in development mode on port 5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

Open `http://localhost:5173` in your browser.

---

## 🧪 Testing & Verification

Run the automated backend test suite:

```bash
cd server
npm test
```

This verifies:
1. Environment variable resolution (`MONGODB_URI`) and credential masking.
2. Bcrypt password hashing (`salt(10)` + `hash`) and secure comparison.
3. JWT token generation, signature validation, and payload decoding.
4. Nutrition engine macro calculations (protein & calorie surplus/deficit based on goal).
5. Suggestion algorithm generation and routine catalog consistency.

---

## 🔒 Security & Authentication Highlights

1. **Bcrypt Password Hashing**: Passwords are encrypted before persisting to MongoDB Atlas via an asynchronous Mongoose `pre('save')` hook with a salt factor of 10.
2. **JWT Authentication**: User sessions are authenticated using stateless JSON Web Tokens signed with `JWT_SECRET`. Tokens expire in 7 days and are verified by `authMiddleware.js`.
3. **Data Isolation**: All workout queries and mutations (`GET`, `POST`, `DELETE`, `PUT`) are scoped strictly to `req.user._id`. Users cannot view or delete another user's workout data.
4. **Credential Security**: MongoDB Atlas credentials are encrypted in `.env` and masked (`mongodb+srv://user:*****@cluster...`) in all console logging to prevent inadvertent leaks.
5. **Email Verification**: User registration generates a time-limited 6-digit OTP. In local development (without SMTP credentials), the OTP is logged to the server terminal and returned in the registration response message for friction-free onboarding.
