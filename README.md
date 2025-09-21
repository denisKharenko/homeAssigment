# Stock Portfolio Calculator

A **full-stack application** to calculate the value of a stock portfolio in real time.
Users can enter multiple stock symbols and their quantities, and the app fetches current market prices to compute total portfolio value.

---

## Features

* Enter one or multiple stock symbols and quantities.
* Calculates current stock price and total value.
* Displays portfolio total.
* Maintains a history of previous requests with timestamp.
* Handles invalid symbols and invalid quantities gracefully.

---

## Tech Stack

* **Frontend:** React
* **Backend:** Node.js, Express
* **API:** Twelve Data API for stock prices
* **HTTP Client:** Axios
* **CORS Handling:** Express CORS middleware

---

## Folder Structure

```
project-root/
│
├─ backend/        # Express server
│   ├─ app.js
│   ├─ routes/     # API routes (optional)
│   ├─ package.json
│   └─ node_modules/
│
├─ frontend/       # React app
│   ├─ src/
│   ├─ public/
│   ├─ package.json
│   └─ node_modules/
│
└─ README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/stock-portfolio.git
cd stock-portfolio
```

### 2. Install dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

---

### 3. Run the app

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm start
```

* React app runs on `http://localhost:3001` by default.
* Express backend runs on `http://localhost:3000` (or your chosen port).

---

### 4. Using the App

1. Enter the stock symbol (e.g., `AAPL`) and quantity (positive integer).
2. Click **"Calculate"** to fetch prices and calculate totals.
3. See results displayed below the form.
4. History of previous requests is maintained with timestamps.

---

### Notes

* Do **not commit `node_modules`** — `.gitignore` is included.
* Make sure to replace the **Twelve Data API key** in `backend/app.js` with your own key.
* CORS is enabled in backend to allow frontend requests.

---

### Optional Improvements

* Auto-complete for stock symbols from API.
* Clear history button.
* Validation feedback in the form.
