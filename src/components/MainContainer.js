import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const url = "http://localhost:3001/stocks"
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [filter, setFilter] = useState("All")
  const [alphOrder, setAlphOrder] = useState(false)
  const [priceOrder, setPriceOrder] = useState(false)

  useEffect(() => {
    fetch(url)
    .then(r => r.json())
    .then(data => setStocks(data))
  }, [])


  const addStockToPortfolio = (stockID) => {
    const thisStock = stocks.find(stock => stock.id === stockID)
    setPortfolio([...portfolio, thisStock])
  }

  const removeStockFromPortfolio = (portID) => {
    const thisPort = portfolio.filter(port => port.id !== portID)
    setPortfolio(thisPort)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const filteredStocks = stocks.filter(stock => {
    if (filter === "All") return true
    return stock.type === filter
  })

  const sortStocks = (e) => {
   if (e.target.value === "Alphabetically") {
     setAlphOrder(true) 
     setPriceOrder(false)
    } else if (e.target.value === "Price") {
      setPriceOrder(true)
      setAlphOrder(false)
    }
  }

  let whichSort
    if (alphOrder) {
      whichSort = filteredStocks.sort((a, b) => a.ticker.localeCompare(b.ticker))
    } else if (priceOrder) {
      whichSort = filteredStocks.sort((a, b) => parseInt(b.price - a.price))
    } else {
      whichSort = filteredStocks
    }

  return (
    <div>
      <SearchBar alphOrder={alphOrder} priceOrder={priceOrder} handleFilter={handleFilter} sortStocks={sortStocks}/>
      <div className="row">
        <div className="col-8">
          <StockContainer addStock={addStockToPortfolio} stocks={whichSort}/>
        </div>
        <div className="col-4">
          {portfolio.length >= 1 ? <PortfolioContainer portfolio={portfolio} removeStock={removeStockFromPortfolio}/> : null}
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
