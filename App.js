import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import Coin from "./components/Coin";

function App() {
  const [listOfCoin, setListofCoin] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins").then((response) => {
      console.log(response.data.coins)
      setListofCoin(response.data.coins);
    });
  }, []);

  const filterCoin = listOfCoin.filter((coin)=>{
    return coin.name.toLowerCase().includes(searchCoin.toLowerCase());
  })

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input type="text" placeholder="Enter Crypto Coin Name" onChange={(event)=>{
          setSearchCoin(event.target.value);
        }}/>
      </div>
      <div className="cryptoDisplay">
        {filterCoin.map((coin,index) => {
          return (
            <Coin key={index}
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
