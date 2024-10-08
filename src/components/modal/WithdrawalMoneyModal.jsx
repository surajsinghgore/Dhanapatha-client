import { useState } from "react";
import "../../style/profile.css";
import { toast } from "react-toastify";


const WithdrawalMoneyModal = ({ onClose, onAddBalance }) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = async () => {
    if (amount == "") {
      toast.error("Please Enter amount");
      return;
    }
    if (amount) {
      onAddBalance(Number(amount));
    }

  };

  const handleClickOutside = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content">
        <h2>Enter Money to Withdrawal </h2>
        <input type="text" value={amount} onChange={handleAmountChange} placeholder="Enter amount" className="amount-input-modal" />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn-modal">
            Cancel
          </button>
          <button onClick={handleSubmit} className="submit-btn-modal">
            Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalMoneyModal;
