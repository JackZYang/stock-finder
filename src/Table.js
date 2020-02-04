import React from "react";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }

const Table = ({ row }) => {
  const columns = [
    { title: "Name", field: "companyName" },
    {
      title: "Symbol",
      field: "symbol",
      formatter: "link",
      formatterParams: {
        url: cell => "https://finance.yahoo.com/quote/" + cell.getValue(),
        target: "_blank"
      }
    },
    { title: "Previous Close", field: "previousClose" },
    { title: "Price", field: "latestPrice" },
    {
      title: "Change",
      field: "change",
      formatter: cell => {
        let value = cell.getValue();
        cell.getElement().style.color = value >= 0 ? "#02662C" : "#FF5733";
        return value;
      }
    },
    {
      title: "Percent",
      field: "changePercent",
      formatter: cell => {
        let value = cell.getValue();
        cell.getElement().style.color = value >= 0 ? "#02662C" : "#FF5733";
        return (value * 100).toFixed(2);
      }
    }
  ];

  const options = {
    movableRows: true
  };
  return (
    <div>
      <ReactTabulator columns={columns} data={row} options={options} />
    </div>
  );
};

export default Table;
