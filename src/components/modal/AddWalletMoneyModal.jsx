import React, { useState } from "react";
import "../../style/profile.css";

const AddWalletMoneyModal = ({ onClose, onAddBalance }) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = () => {
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
        <h2>Add Money to wallet</h2>
        <input type="text" value={amount} onChange={handleAmountChange} placeholder="Enter amount" className="amount-input" />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSubmit} className="submit-btn">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWalletMoneyModal;