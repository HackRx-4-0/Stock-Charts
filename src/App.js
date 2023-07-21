import React from "react";
import Navbar from "./component/Navbar";
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StockDetails from "./component/StockDetail";

const stockData = [
  { stockName: "Bharti Airtel", stockPrice: "799" },
  { stockName: "BhaAirtel", stockPrice: "7900" },
  { stockName: "Bh Airtel", stockPrice: "79" },
  { stockName: "Bharti ", stockPrice: "99" },
  // Add more stock data objects as needed
];

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="flex flex-col items-center mt-10">
          <Routes>
            {/* Pass stockData as a prop inside the Route */}
            <Route exact path="/" element={<HomePage stockData={stockData} />} />
            <Route path="/stockdetails/:stockName" element={<StockDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
