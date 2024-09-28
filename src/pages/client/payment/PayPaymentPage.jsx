import { useState } from "react";
import "../../../style/paypaymentpage.css";
import { IoArrowBack } from "react-icons/io5";
import Images from "../../../constants/Images";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getLocalStorageJSON } from "../../../utils/LocalStorage";
import { toast } from "react-toastify";
import tickSound from "../../../assets/tune/complete.mp3";
import { transferMoney } from "../../../utils/services/user/PaymentServices";

import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";

const PayPaymentPage = () => {
  const dispatch = useDispatch();
  const [audio] = useState(new Audio(tickSound));
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const { value } = e.target;

    // Only allow digits
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleKeypadClick = (key) => {
    if (key === "X") {
      // Handle backspace (remove last character)
      setAmount(amount.slice(0, -1));
    } else if (key === ".") {
      // Replace the decimal point with "00"
      setAmount(amount + "00");
    } else {
      // Append clicked number
      setAmount(amount + key);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const payAmount = async () => {
    if (amount === "") {
      toast.warn("Please enter amount to pay");
      return;
    }
    if (parseFloat(amount) < 41) {
      toast.warn("The amount must be above 41");
      return;
    }

    dispatch(showLoader());
    const simulateProgress = () => {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 4;
        dispatch(updateProgress(currentProgress));

        if (currentProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 100);
    };

    simulateProgress();
    try {
      let body = { receiverEmail: getLocalStorageJSON("paymentUser").email, amount: amount };
      let res = await transferMoney(body);
      if (res.success) {
        toast.success(`Money Transfer Successfully to ${getLocalStorageJSON("paymentUser").email}`);
        setTimeout(() => {
          navigate("/user/payment-status");
          audio.play().catch((error) => {
            console.error("Audio play failed:", error);
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      dispatch(updateProgress(100));
    } finally {
      setTimeout(() => {
        dispatch(hideLoader());
      }, 2000);
    }
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
      <p className="text-pay">paying to {getLocalStorageJSON("paymentUser").username}</p>

      <div className="amount-section">
        <span className="currency-symbol">₹</span>
        <input type="text" className="amount-input" value={amount} onChange={handleAmountChange} placeholder="1,500" />
      </div>

      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "X"].map((key, index) => (
          <button key={index} className="keypad-btn" onClick={() => handleKeypadClick(key)}>
            {key}
          </button>
        ))}
      </div>

      <button className="submit-btn" onClick={() => payAmount()}>
        Pay
      </button>
    </div>
  );
};

export default PayPaymentPage;
