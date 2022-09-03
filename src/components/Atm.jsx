import DepositForm from "./DepositForm";
import { useState, useEffect } from "react";
import CurrencyBtn from "./CurrencyBtn";

const Atm = () => {
  // Currencies supported
  const currencies = [{
    ISOCode: "SEK",
    rate: "1"
  },{
    ISOCode: "EURO",
    rate: "10.75"
  },{
    ISOCode: "USD",
    rate: "10.78"
  },{
    ISOCode: "MXN",
    rate: "0.54"
  }];

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
    const currency = currencies.find(c => c.ISOCode === curr);
    setConvertedAmount(amount * currency.rate);
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
        {currencies.map((c, index) => (
          <CurrencyBtn 
            key={index} 
            ISOCode={c.ISOCode} 
            changeCurrency={changeCurrency}
          />
        ))}
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