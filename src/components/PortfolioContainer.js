import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, removeStock }) {

  const stocksInPortfolio = portfolio.map(port => {

    const handleRemove = () => {
      removeStock(port.id)
    }
    return (
      <Stock 
      key={port.id}
      ticker={port.ticker}
      name={port.name}
      price={port.price}
      handleClick={handleRemove}
      />
    )
  })
  
  return (
    <div>
      <h2>My Portfolio</h2>
      {stocksInPortfolio}
    </div>
  );
}

export default PortfolioContainer;
