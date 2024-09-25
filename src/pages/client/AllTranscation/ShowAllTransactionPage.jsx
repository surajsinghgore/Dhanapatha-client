import TransactionCard from "../../../components/cards/TransactionCard";
import CommonHeader from "../../../components/common/CommonHeader";

const ShowAllTransactionPage = () => {
  return (
    <div>
      <CommonHeader link="/user/dashboard" title="All Transaction Details" />

      <div className="white">
        <div className="transactionCardContainer">
          <p className="dateFull">Today</p>
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <p className="dateFull">26 december 2024</p>
          <TransactionCard />
          <TransactionCard />
        </div>
      </div>
    </div>
  );
};

export default ShowAllTransactionPage;
