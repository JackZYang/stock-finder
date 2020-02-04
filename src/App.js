import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "semantic-ui-react";
import Table from "./Table";
import "./App.css";

const token = "sk_c6660239c1ff43839bf85c8d9415257e";

function App() {
  const [symbol, setSymbol] = useState("");
  const [row, setRow] = useState([]);

  const handleChange = e => {
    setSymbol(e.target.value);
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
        console.log(stockInfo);
        if (row.filter(obj => obj.symbol === stockInfo.symbol).length === 0) {
          row.push({
            symbol: stockInfo.symbol,
            companyName: stockInfo.companyName,
            previousClose: stockInfo.previousClose,
            latestPrice: stockInfo.latestPrice,
            change: stockInfo.change,
            changePercent: stockInfo.changePercent
          });
          setSymbol("");
        }
      });
  };

  return (
    <div>
      <Input
        icon="search"
        onChange={handleChange}
        onKeyPress={event => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
        value={symbol}
        placeholder="Search..."
      />
      <Button color="orange" onClick={handleSubmit}>
        Add
      </Button>
      <Table row={row} />
    </div>
  );
}

export default App;
