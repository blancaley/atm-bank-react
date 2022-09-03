const DepositForm = ({ depositAmount, setDepositAmount, deposit }) => {

  const onChange = e => {
    setDepositAmount(parseInt(e.target.value))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    deposit(depositAmount);
    document.querySelector("#deposit").value = "";
  }

  return (
    <div className="card">
      <h3>Deposit money (SEK)</h3>
      <form>
        <input 
          type="number"
          id="deposit"
          onChange={onChange}/>
        <br/>
        <button 
          className="btn success"
          onClick={onSubmit}>Deposit</button>
      </form>
    </div>
  );
}
 
export default DepositForm;