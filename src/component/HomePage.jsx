import React, { useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import StockData from "./StockData";
// import { Link } from "react-router-dom";

const cardsData = [
  {
    id: 1,
    title: "Google",
    content: "Content",
  },
  {
    id: 2,
    title: "Amazon",
    content: "Content",
  },
  {
    id: 3,
    title: "Bajaj",
    content: "Content",
  },
  {
    id: 4,
    title: "Microsoft",
    content: "Content",
  },
  // Add more cards as needed
];

const HomePage = ({ stockData }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setSubmitted(true);
  };

  const toggleCardSelection = (cardId) => {
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(cardId)) {
        // Card is already selected, unselect it
        return prevSelected.filter((id) => id !== cardId);
      } else {
        // Card is not selected, select it
        return [...prevSelected, cardId];
      }
    });
  };

  const isCardSelected = (cardId) => selectedCards.includes(cardId);
  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-20">
      <div className="mb-8 flex items-center">
        <input
          type="text"
          className="px-4 py-2 border text-sm rounded-l-md"
          placeholder="Search for Stock"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <RiSearchEyeLine
          className="bg-white px-4 py-5 rounded-r-md"
          size="1.5rem"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className={`bg-white p-4 shadow rounded-md transition duration-300 ${
              isCardSelected(card.id) ? "border-2 border-black" : "border"
            }`}
            onClick={() => toggleCardSelection(card.id)}
          >
            {isCardSelected(card.id) && (
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
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p>{card.content}</p>
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
            {stockData.map((stock, index) => (
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
