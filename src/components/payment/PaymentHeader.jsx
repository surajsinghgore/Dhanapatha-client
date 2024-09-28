import { Link } from "react-router-dom";
import Images from "../../constants/Images";
import "../../style/payment.css";
import { IoArrowBack } from "react-icons/io5";
import { getLocalStorage, getLocalStorageJSON } from "../../utils/LocalStorage";
import { useState } from "react";
const PaymentHeader = () => {
  const selectUser = getLocalStorage("paymentUser") ? getLocalStorageJSON("paymentUser") : null;

  return (
    <div className="payment">
      <div className="header">
        <div className="back">
          <Link to="/user/dashboard">
            <IoArrowBack className="backIcon" title="Go back" />
          </Link>
        </div>
        <div className="profile">
          <div className="images">
            <img src={Images.user} alt="user" />
          </div>
          <div className="text">
            <h4>{selectUser?.username}</h4>
            <p>{selectUser?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
