import Images from "../../constants/Images";

const TransactionCard = () => {
  return (
 <div className="transactionCard">
      <div className="img">
        <img src={Images.user} alt="user" />
      </div>
      <div className="texts">
        <h4>To Suraj singh</h4>
        <h6>20 Dec 2024</h6>
      </div>
      <div className="amount">-$40.00</div>
    </div>
  );
};

export default TransactionCard;