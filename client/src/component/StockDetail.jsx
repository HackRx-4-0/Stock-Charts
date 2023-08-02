import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { storage } from "../Firebase";
import { ref, getDownloadURL } from "firebase/storage";

const StockDetails = () => {
  const [stockImagePath, setStockImagePath] = useState("");
  useEffect(() => {
    const starsRef = ref(storage, 'images/AAPL_chart.png');
    getDownloadURL(starsRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        setStockImagePath(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
          default:
            console.log("default");
            break;
        }
      });
  }, []);
  const { stockName } = useParams();
  // Here, you can fetch additional data based on the stockName parameter,
  // and display more detailed information about the stock.
  return (
    <div>
      <h1 className="border-2 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-300">
        Stock Details: {stockName}
      </h1>
      <img src={stockImagePath} alt="BigCo Inc. logo" />
      {/* Display more detailed information about the stock */}
    </div>
  );
};
export default StockDetails;
