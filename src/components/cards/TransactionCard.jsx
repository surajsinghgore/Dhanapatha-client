import Images from "../../constants/Images";
import { formatDate } from "../../utils/formatDate";
import { getLocalStorageJSON } from "../../utils/LocalStorage";

const TransactionCard = ({ data }) => {
  console.log(data);
  let date = formatDate(data.createdAt);
  let currentUser = getLocalStorageJSON("user");
  return (
    <div className="transactionCard">
      <div className="img">
        <img src={Images.user} alt="user" />
      </div>
      <div className="texts">
        <h4>
          {data.status == "refunded" ? "From " : <> {currentUser.username == data?.receiver?.username ? "From " : "To "}</>}
          {currentUser.username == data?.receiver?.username ? <>{data?.senderUsername}</> : <>{data?.receiver?.username}</>}{" "}
        </h4>
        <h6>
          {date} {data.status == "refunded" ? "Refunded" : "Paid"}
        </h6>
      </div>
      {data.status == "refunded" ? <span className="orange">+ ₹{data.amount}</span> :<div className="amount">{currentUser.username == data?.receiver?.username ? <span className="green">+ ₹{data.amount}</span> : <span className="red">- ₹{data.amount}</span>} </div>
      }
    </div>
  );
};

export default TransactionCard;
