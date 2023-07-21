import React from "react";
import { useParams } from "react-router-dom";

const StockDetails = () => {
  const { stockName } = useParams();
  // Here, you can fetch additional data based on the stockName parameter,
  // and display more detailed information about the stock.
  return (
    <div>
      <h1 className="border-2 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-300">Stock Details: {stockName}</h1>
      {/* Display more detailed information about the stock */}
    </div>
  );
};
export default StockDetails;
