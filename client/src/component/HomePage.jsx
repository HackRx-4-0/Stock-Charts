import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiSearchEyeLine } from "react-icons/ri";
import "react-lazy-load-image-component/src/effects/blur.css";
import Chart from "react-apexcharts";
import StockData from "./StockData"

const HomePage = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [visibleStocks, setVisibleStocks] = useState(10); // Number of initially visible stocks
  const [hasMore, setHasMore] = useState(true);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const toggleCardSelection = (stockName) => {
    setSubmitted(false);
    setSelectedCards((prevSelected) =>
      prevSelected.includes(stockName)
        ? prevSelected.filter((name) => name !== stockName)
        : [...prevSelected, stockName]
    );
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

  const [stockPrices, setStockPrices] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch new data and update stockPrices
      const fetchDataAndUpdatePrices = async () => {
        const stockData = await fetchStockData();
        if (stockData) {
          const updatedPrices = {};
  
          stockData.forEach((data) => {
            if (data && data.Symbol && data.Price) {
              updatedPrices[data.Symbol] = parseFloat(data.Price);
            }
          });
  
          setStockPrices((prevPrices) => ({
            ...prevPrices,
            ...updatedPrices,
          }));
        }
      };
  
      fetchDataAndUpdatePrices();
    }, 5000); // Fetch new data every 5 seconds
  
    return () => clearInterval(interval);
  }, []);

  const isCardSelected = (stockName) => selectedCards.includes(stockName);
  const selectedStocks = stockData
    .map((stock) => ({
      stockName: stock.Symbol,
      stockPrice: stockPrices[stock.Symbol] || parseFloat(stock.Price),
      stockFullName: stock.Name,
      prevStockPrice: stockPrices[stock.Symbol] || parseFloat(stock.Price),
    }))
    .filter((stock) => stock.stockName && stock.stockPrice);

  const loadMoreStocks = () => {
    setVisibleStocks((prevVisible) => prevVisible + 10); // Increase the number of visible stocks
  };

  useEffect(() => {
    // Check if there are more stocks to load
    if (visibleStocks >= selectedStocks.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [visibleStocks, selectedStocks]);

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
      {stockData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {selectedStocks.slice(0, visibleStocks).map((stock) => (
          <div
            key={stock.stockName}
            className={`bg-white h-96 shadow justify-start rounded-md transition duration-300 ${
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
            <div className="flex flex-col px-10 mt-2">
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
              <Chart
                options={{
                  // Chart options
                }}
                series={[
                  {
                    name: "Price",
                    data: [stock.prevStockPrice, stock.stockPrice],
                  },
                ]}
                type="area"
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
      )}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded border-2 font-semibold border-[#050713] hover:bg-[#050713] hover:text-white"
            onClick={loadMoreStocks}
          >
            Load More
          </button>
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
            {selectedStocks.map((stock, index) => (
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
