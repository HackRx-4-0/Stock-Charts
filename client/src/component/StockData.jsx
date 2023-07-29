import React from "react";
import { Link } from "react-router-dom";
const StockData = ({ stockName, stockPrice }) => {
  return (
    <div>
      <Link to={`/stockdetails/${stockName}`}>
        <div className="flex justify-between items-center hover:bg-[#2C3987] hover:text-gray-100 mx-auto bg-gray-300 p-4  border-black border rounded shadow-md mb-2 transition-all duration-300 ease-in-out">
          <div className="text-right pr-2">{stockName}</div>
          <div className=""></div>
          <div className="text-left pl-2">{stockPrice}</div>
        </div>
      </Link>
    </div>
  );
};
export default StockData;
