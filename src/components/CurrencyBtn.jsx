const CurrencyBtn = ({ ISOCode, changeCurrency }) => {
  return (
    <button onClick={()=>changeCurrency(ISOCode)}>
      {ISOCode}
    </button>
  );
}
 
export default CurrencyBtn;