import React from "react";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import Images from "../../constants/Images";
import TransactionCard from "../cards/TransactionCard";

const Transaction = () => {
  return (
    <div className="transaction">
      <h2>Recent Activity</h2>

      <div className="transactionCardContainer">
        <TransactionCard/>
        <TransactionCard/>
        <TransactionCard/>
        <TransactionCard/>
        <TransactionCard/>
      </div>

      <div className="bottom">
        <Link to="">See more</Link>
      </div>
    </div>
  );
};

export default Transaction;
