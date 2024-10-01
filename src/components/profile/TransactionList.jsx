import "../../style/profile.css";

const TransactionList = ({ data }) => {

  return (
    <div className="transaction-items">
      <div className={`transaction-item ${data?.type}`}>
        <div className="transaction-info">
          <p>{data?.type}</p>
          <span>{data?.status}</span>
        </div>
        <p className="transaction-amount">₹ {(data?.type=="addMoney")?" + " :" - "}{data?.amount}</p>
      </div>
    </div>
  );
};

export default TransactionList;
