import React from "react";
import Stock from "./Stock";

function StockContainer({ addStock, stocks }) {

  const listOfStocks = stocks.map(stock => {
    const handleAddClick = () => {
      addStock(stock.id)
    }
    return (
      <Stock 
      key={stock.id}
      ticker={stock.ticker}
      name={stock.name}
      price={stock.price}
      handleClick={handleAddClick}
      />
    )
  })

  return (
    <div>
      <h2>Stocks</h2>
      {listOfStocks}
    </div>
  );
}

export default StockContainer;
