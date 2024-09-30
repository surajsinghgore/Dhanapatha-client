import  { useState } from "react";
import "../../style/profile.css";

const AddWalletMoneyModal = ({ onClose, onAddBalance }) => {
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setErrorMessage(""); // Clear error message on valid input
    } else {
      setErrorMessage("Invalid amount"); // Show error for invalid input
    }
  };

  const handleSubmit = () => {
    const amountNum = Number(amount);
    if (amountNum > 0) {
      onAddBalance(amountNum);
       
    } else {
      setErrorMessage("Please enter a valid amount greater than zero");
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
        <h2>Add Money to Wallet</h2>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="amount-input-modal"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn-modal">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="submit-btn-modal"
            disabled={!amount || Number(amount) <= 0} // Disable if amount is invalid
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWalletMoneyModal;
