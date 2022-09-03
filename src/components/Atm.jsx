import DepositForm from "./DepositForm";
import { useState, useEffect } from "react";

const Atm = () => {
  // Amount to withdraw
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currency, setCurrency] = useState("SEK");
  const [balance, setBalance] = useState(1000);
  const [depositAmount, setDepositAmount] = useState(null);

  // Updates the previewed amount in SEK when there is a new amount
  useEffect(() => {
    convertAmount(currency)
  }, [amount])

  // Converts amount to other currencies
  const convertAmount = (curr) => {
    // In Swedish Crowns
    const SEK = 1;
    const EURO = 10.75;
    const USD = 10.78;
    const MXN = 0.54;

    if (curr === "SEK") { 
      setConvertedAmount(amount * SEK);
    }
    if (curr === "EURO") { 
      setConvertedAmount(amount * EURO);
    }
    if (curr === "USD") { 
      setConvertedAmount(amount * USD);
    }
    if (curr === "MXN") { 
      setConvertedAmount(amount * MXN);
    }
  }
  // Previews the amount to withdraw
  const changeAmount = (value) => {
    setAmount(amount + value);
  }

  // Change tex SEK, EURO, USD
  const changeCurrency = (curr) => {
    setCurrency(curr);
    convertAmount(curr);
  }
  
  // Withdraw
  const withdraw = () => {
    if (convertedAmount > balance) {
      console.log("There's not enough money. Select smaller amount.");
      setAmount(0);
      return;
    }

    setBalance(balance - convertedAmount);
    setAmount(0);
  }

  const deposit = () => {
    setBalance(balance + depositAmount);
  }

  return (
    <div>
      <h2>Current balance: {balance} SEK</h2>
      <h2>Amount to withdraw: {amount} {currency}</h2>
      {/* Show amount in SEK if other currency is selected */}
      {currency !== "SEK" && <p>({convertedAmount} SEK)</p>}

      {/* Add money */}
      <div>
        <button onClick={()=>changeAmount(100)}>
          +100
        </button>
        <button onClick={()=>changeAmount(500)}>
          +500
        </button>
        <button onClick={()=>changeAmount(1000)}>
          +1000
        </button>
      </div>

      {/* Change currency */}
      <div>
        <button onClick={()=>changeCurrency("SEK")}>
          SEK
        </button>
        <button onClick={()=>changeCurrency("EURO")}>
          EURO
        </button>
        <button onClick={()=>changeCurrency("USD")}>
          USD
        </button>
        <button onClick={()=>changeCurrency("MXN")}>
          MXN
        </button>
      </div>
      <br/>
      <button onClick={()=>withdraw(amount)}>Withdraw money</button>
      <DepositForm 
        depositAmount={depositAmount}
        setDepositAmount={setDepositAmount}
        deposit={deposit}
      />
    </div>
  );
}
 
export default Atm;