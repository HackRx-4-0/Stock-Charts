import React, { useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import StockData from "./StockData";

const HomePage = ({ stockData }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  const isCardSelected = (stockName) => selectedCards.includes(stockName);
  const filteredStocks = stockData.filter((stock) =>
    stock.stockName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStocks = stockData.filter((stock) =>
    selectedCards.includes(stock.stockName)
  );

  return (
    <div className="container mx-auto py-8 px-20">
      <div className="mb-8 flex items-center">
        <input
          type="text"
          className="px-4 py-3 border text-sm rounded-l-md h-full" // Add h-full class here
          placeholder="Search for Stock"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="bg-white px-2 py-2.5 hover:cursor-pointer rounded-r-md h-full">
          <RiSearchEyeLine size="1.5rem" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {filteredStocks.map((stock) => (
          <div
            key={stock.stockName}
            className={`bg-white p-4 shadow rounded-md transition duration-300 ${
              isCardSelected(stock.stockName)
                ? "border-2 border-black"
                : "border"
            }`}
            onClick={() => toggleCardSelection(stock.stockName)}
          >
            {isCardSelected(stock.stockName) && (
              <div className="absolute">
                <svg
                  className="w-4 h-4 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
            <h2 className="text-xl font-bold mb-2">{stock.stockName}</h2>
            <p>{stock.stockPrice}</p>
          </div>
        ))}
      </div>
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
