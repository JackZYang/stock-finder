import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "semantic-ui-react";
import Table from "./Table";
import "./App.css";

const token = "sk_c6660239c1ff43839bf85c8d9415257e";

function App() {
  const [symbol, setSymbol] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = e => {
    setSymbol(e.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    axios
      .get(
        "https://cloud.iexapis.com/stable/stock/" +
          symbol +
          "/quote?token=" +
          token
      )
      .then(res => {
        const stockInfo = res.data;
        if (
          rows.filter(stock => stock.symbol === stockInfo.symbol).length === 0
        ) {
          rows.push({
            symbol: stockInfo.symbol,
            companyName: stockInfo.companyName,
            marketCap: stockInfo.marketCap,
            previousClose: stockInfo.previousClose,
            latestPrice: stockInfo.latestPrice,
            change: stockInfo.change,
            changePercent: stockInfo.changePercent
          });
          setSymbol("");
        }
      })
      .catch(error => setError(true));
  };

  return (
    <div className="app">
      <h1>Stock Finder</h1>
      <Input
        icon="search"
        error={error}
        onChange={handleChange}
        onKeyPress={event => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
        value={symbol}
        placeholder="Symbol"
      />
      <Button color="orange" onClick={handleSubmit}>
        Add
      </Button>
      <div className="error">{error && "Symbol could not be found"}</div>
      <Table rows={rows} />
    </div>
  );
}

export default App;
