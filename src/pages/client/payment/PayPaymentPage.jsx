import { useState } from "react";
import "../../../style/paypaymentpage.css";
import { IoArrowBack } from "react-icons/io5";
import Images from "../../../constants/Images";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const PayPaymentPage = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const handleAmountChange = (e) => {
    const { value } = e.target;

    // Only allow digits and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleKeypadClick = (key) => {
    if (key === "X") {
      // Handle backspace (remove last character)
      setAmount(amount.slice(0, -1));
    } else if (key === ".") {
      // Only add a decimal point if it doesn't already exist
      if (!amount.includes(".")) {
        setAmount(amount + key);
      }
    } else {
      // Append clicked number
      setAmount(amount + key);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="payment-form">
      <div className="header">
        <button className="back-btn" onClick={() => goBack()} title="Go back">
          <IoArrowBack />
        </button>
        <div className="user-info">
          <img src={Images.user} alt="User Avatar" className="avatar" />
          <div className="paying-text">
            <FaLongArrowAltRight />
          </div>
          <img src={Images.user} alt="User Avatar" className="avatar" />
        </div>
      </div>
      <p className="text-pay">paying to Suraj Singh </p>

      <div className="amount-section">
        <span className="currency-symbol">₹</span>
        <input type="text" className="amount-input" value={amount} onChange={handleAmountChange} placeholder="1,500" />
      </div>

      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "X"].map((key, index) => (
          <button key={index} className="keypad-btn" onClick={() => handleKeypadClick(key)}>
            {key}
          </button>
        ))}
      </div>

      <Link to="/user/payment-status">
        <button className="submit-btn">Pay</button>
      </Link>
    </div>
  );
};

export default PayPaymentPage;
