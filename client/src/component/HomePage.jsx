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

  const fetchStockData = async (symbol) => {
    const apiKey = "NTQK2Y25H6M5QGSJ";
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const stockData = response.data["Global Quote"];
      return stockData;
    } catch (error) {
      console.error("Error fetching data for symbol:", symbol, error);
      return null;
    }
  };

  useEffect(() => {
    const symbols = [
      'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NVDA', 'JPM', 'JNJ', 'V',
      'PYPL', 'UNH', 'MA', 'BAC', 'ADBE', 'CMCSA', 'XOM', 'INTC', 'VZ', 'NFLX',
      'KO', 'CSCO', 'PEP', 'T', 'CRM', 'PFE', 'DIS', 'ABT', 'ABBV', 'NKE', 'BMY',
      'NVZMY', 'TSM', 'TMUS', 'ACN', 'NVS', 'BABA', 'AMGN', 'ASML', 'AVGO', 'COST',
      'CVX', 'DEO', 'DHR', 'EL', 'NEE', 'PYPL', 'QCOM', 'TM', 'UNP', 'UPS', 'SNY',
      'SAP', 'SBUX', 'NVO', 'MDT', 'LIN', 'LMT', 'LLY', 'HSBC', 'HON', 'GOOG',
      'GL', 'GIS', 'GE', 'FCAU', 'FDX', 'EXC', 'ENB', 'ECL', 'DUK', 'DOV', 'D',
      'COP', 'CCEP', 'CCL', 'BSX', 'BLK', 'BHP', 'BDX', 'AXP', 'APD', 'ANTM',
      'ADI', 'ADP', 'ABEV', 'AAXN', 'AAL', 'A', 'AAP', 'AMD', 'ALB', 'AIV', 'AIG',
      'ABB', 'ABBV', 'ABMD', 'AAPL', 'AMAT', 'APTV', 'ADM', 'ADSK', 'ADP', 'AZO',
    ];
    const fetchData = async () => {
      const stockData = await Promise.all(
        symbols.map((symbol) => fetchStockData(symbol))
      );
      setStockData(stockData.filter((data) => data && data["01. symbol"] && data["05. price"]));
    };
    fetchData();
  }, []);

  const isCardSelected = (stockName) => selectedCards.includes(stockName);
  const selectedStocks = stockData
    .map((stock) => ({
      stockName: stock["01. symbol"],
      stockPrice: stock["05. price"],
    }))
    .filter((stock) => stock.stockName && stock.stockPrice);

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
          {selectedStocks.map((stock) => (
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
                <h2 className="text-xl font-bold mb-2">{stock.stockName}</h2>
                <p>{stock.stockPrice}</p>
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
