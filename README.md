# E-Commerce Web Application

A simple, full-stack E-Commerce web application built for a Cloud Computing practical.

## Overview
This project consists of a React frontend and a Node.js/Express backend connected to a MongoDB database. It allows users to view a list of products, add them to a shopping cart, and simulate a checkout process.

## Features
- **Frontend**: Built with React (Vite). Displays products and manages cart state.
- **Backend**: Built with Node.js and Express.js. Handles API requests.
- **Database**: MongoDB via Mongoose. Stores product and order data.
- **Styling**: Pure CSS. Clean, responsive, and beginner-friendly without external frameworks.

## Folder Structure
```
ecommerce-app/
│
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # ProductList and Cart components
│   │   ├── App.jsx         # Main application state and routing
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # React entry point
│   ├── package.json
│   └── .env                # Stores VITE_API_URL
│
├── server/                 # Node.js Backend
│   ├── models/             # Mongoose schemas (Product, Order)
│   ├── routes/             # API routes
│   ├── server.js           # Express entry point
│   ├── package.json
│   └── .env                # Stores PORT and MONGO_URI
│
└── README.md               # Project documentation
```

## How to Run Locally (Windows/Linux)

### Prerequisites
- Node.js installed
- MongoDB running locally (default: `mongodb://127.0.0.1:27017`)

### 1. Start the Backend
Open a terminal in the `server` directory:
```bash
cd server
npm install
npm run dev
```
*Note: The server runs on `http://localhost:5000` by default.*

### 2. Add Dummy Data (Optional)
To test the app, you need some products. You can send a POST request to the API:
```bash
curl -X POST http://localhost:5000/api/products -H "Content-Type: application/json" -d "{\"name\":\"Cloud Server\", \"price\":99.99, \"description\":\"Basic cloud instance\"}"

curl -X POST http://localhost:5000/api/products -H "Content-Type: application/json" -d "{\"name\":\"Database Cluster\", \"price\":149.50, \"description\":\"High availability database\"}"
```
*(You can also use tools like Postman to do this).*

### 3. Start the Frontend
Open a new terminal in the `client` directory:
```bash
cd client
npm install
npm run dev
```
*Note: The frontend usually runs on `http://localhost:5173`. Open this URL in your browser.*

---

## How to Deploy on Ubuntu EC2

### 1. Clone/Upload the Code
Upload the `ecommerce-app` folder to your EC2 instance (e.g., using `scp` or Git).

### 2. Setup Database (MongoDB Atlas)
For cloud deployment, it's recommended to use MongoDB Atlas.
- Update `server/.env`: `MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/CloudEcommerce`

### 3. Deploy Backend using PM2
```bash
cd server
npm install
sudo npm install -g pm2
pm2 start server.js --name "ecommerce-api"
```

### 4. Deploy Frontend using Nginx
First, build the frontend:
```bash
cd client
npm install
npm run build
```
This generates a `dist/` folder.

Next, install and configure Nginx:
```bash
sudo apt update
sudo apt install nginx
```
Copy the build files to Nginx:
```bash
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```
Make sure your EC2 Security Group allows inbound traffic on ports 80 (HTTP) and 5000 (Custom TCP).

---

## Environment Variables

### Backend (`server/.env`)
- `PORT`: The port on which the server runs (default: 5000).
- `MONGO_URI`: The connection string to your MongoDB database.

### Frontend (`client/.env`)
- `VITE_API_URL`: The URL of your backend API (e.g., `http://localhost:5000/api`). It tells the React app where to fetch data from.

---

## API Endpoints

- **`GET /api/products`**: Returns an array of all available products.
- **`POST /api/products`**: Inserts a new product into the database.
- **`GET /api/orders`**: Returns an array of all past orders.
- **`POST /api/orders`**: Submits a new order consisting of a list of items and a total amount.

---

## Viva Explanation

**Q: How does this application work?**
A: This is a full-stack application. The frontend is built with React and serves the user interface. When the application loads, React uses the `fetch` API to make an HTTP GET request to our Node.js/Express backend. The backend queries the MongoDB database for products and sends them back as JSON. The user can add these products to their cart. When they click "Place Order", React sends an HTTP POST request to the backend with the cart details, which the backend then saves in the MongoDB `Orders` collection.

**Q: Why use Vite instead of Create React App?**
A: Vite is a modern, faster build tool. It provides a much quicker development server startup and faster Hot Module Replacement (HMR) because it uses native ES modules in the browser.

**Q: How is this deployed?**
A: On the EC2 instance, the backend is kept running continuously in the background using PM2. The frontend code is compiled into static HTML, CSS, and JS files (`npm run build`) and served efficiently by the Nginx web server.
