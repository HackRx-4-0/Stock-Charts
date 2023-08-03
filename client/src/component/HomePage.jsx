import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiSearchEyeLine } from "react-icons/ri";
import StockData from "./StockData";

const HomePage = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [stockData, setStockData] = useState([]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const toggleCardSelection = (stockName) => {
    setSubmitted(false); // Reset the submitted state to false
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(stockName)) {
        // Stock is already selected, unselect it
        return prevSelected.filter((name) => name !== stockName);
      } else {
        // Stock is not selected, select it
        return [...prevSelected, stockName];
      }
    });
  };

  const fetchStockData = async () => {
    const apiUrl =
      "https://script.google.com/macros/s/AKfycbxY2M0HHtrFiBMb9PqHK3RLRPWd_Qoo7haY1ZjOo-ZVjCnMf7pIlmuk40jDzDIUFFyE/exec";

    try {
      const response = await axios.get(apiUrl);
      const stockData = response.data.data.slice(1); // Skip the first element (headers)
      return stockData;
    } catch (error) {
      console.error("Error fetching data", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const stockData = await fetchStockData();
      setStockData(stockData.filter((data) => data && data.Symbol && data.Price));
    };
    fetchData();
  }, []);

  const isCardSelected = (stockName) => selectedCards.includes(stockName);
  const selectedStocks = stockData
    .map((stock, index) => ({
      stockName: stock.Symbol,
      stockPrice: stock.Price,
      stockFullName: stock.Name,
      prevStockPrice: index > 0 ? stockData[index - 1].Price : stock.Price, // Add prevStockPrice
    }))
    .filter((stock) => stock.stockName && stock.stockPrice);
    const filteredStocks = selectedStocks.filter((stock) => {
      return stock.stockName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
    return (
      <div className="container mx-auto py-8 px-20">
        <div className="mb-8 flex items-center">
          <input
            type="text"
            className="px-4 py-3 border text-sm rounded-l-md h-full"
            placeholder="Search for Stock"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="bg-white px-2 py-2.5 hover:cursor-pointer rounded-r-md h-full">
            <RiSearchEyeLine size="1.5rem" />
          </div>
        </div>
        {/* card */}
        {stockData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            {filteredStocks.map((stock) => (
              <div
                key={stock.stockName}
                className={`bg-white h-64 shadow justify-start rounded-md transition duration-300 ${
                  isCardSelected(stock.stockName)
                    ? "border-2 border-black"
                    : "border"
                }`}
                onClick={() => toggleCardSelection(stock.stockName)}
              >
                {isCardSelected(stock.stockName) && (
                  <div className="absolute">
                    <svg
                      className="w-7 h-7 mx-2 mt-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
                <div className="flex justify-between px-10 mt-2">
                  <h2 className="text-xl font-bold mb-2">
                    {stock.stockName} ({stock.stockFullName})
                  </h2>
                  <p
                    className={`rounded-lg p-1 ${
                      stock.stockPrice > stock.prevStockPrice
                        ? "bg-green-400"
                        : stock.stockPrice < stock.prevStockPrice
                        ? "bg-red-400"
                        : "bg-yellow-400"
                    }`}
                  >
                    {(stock.stockPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <button
            className="bg-gray-300 px-4 my-2 py-2 rounded border-2 font-semibold border-[#050713] hover:bg-[#050713] hover:text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {submitted && (
            <div>
              {filteredStocks.map((stock, index) => (
                <StockData
                  key={index}
                  stockName={stock.stockName}
                  stockPrice={stock.stockPrice}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default HomePage;