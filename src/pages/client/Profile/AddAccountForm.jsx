import { useState } from "react";
import "../../../style/setting.css";
import CommonHeader from "../../../components/common/CommonHeader";

const AddAccountForm = () => {
  const [accountDetails, setAccountDetails] = useState({
    accountHolderName: "Rahul Sharma",
    accountNumber: "12345679012",
    ifscCode: "HDFC0000001",
    bankName: "HDFC Bank",
    accountType: "checking",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Account Details:", accountDetails);
  };

  return (
    <>
      <div className="addAccount">
        <CommonHeader link="/user/setting" title="Add Bank Account" />
        <div className="account-form-container">
          <h2>Add Bank Account</h2>
          <form onSubmit={handleSubmit} className="account-form">
            <div className="form-group">
              <label>Account Holder Name</label>
              <input type="text" name="accountHolderName" value={accountDetails.accountHolderName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Account Number</label>
              <input type="text" name="accountNumber" value={accountDetails.accountNumber} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>IFSC Code</label>
              <input type="text" name="ifscCode" value={accountDetails.ifscCode} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Bank Name</label>
              <input type="text" name="bankName" value={accountDetails.bankName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Account Type</label>
              <select name="accountType" value={accountDetails.accountType} onChange={handleChange}>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>

            <button type="submit" className="checkout-btn">
              Add Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAccountForm;
