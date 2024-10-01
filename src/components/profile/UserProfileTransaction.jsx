import "../../style/profile.css";
import { formatDate, formatDateStr } from "../../utils/formatDate";

const UserTransactionList = ({ data }) => {
  return (
    <div className="transaction-items">
      {data?.map((item) => {
        return (
          <div key={item.date}>
            <p style={{ paddingLeft: "10px" }}>{formatDateStr(item.date)}</p>
            {item?.allData.map((txn) => {
              return (
                <div key={txn._id} className={`transaction-item`}>
                  <div className="transaction-info">
                    <p>{txn?.user?.username}</p>
                    <span>{txn?.user?.email}</span>
                  </div>
                  <p className={`transaction-amount ${txn?.status}`}>
                    ₹ {txn?.status === "receiver" ? " + " : " - "}
                    {txn?.amount}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default UserTransactionList;
