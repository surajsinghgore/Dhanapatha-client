import { useEffect, useState } from "react";
import "../../../style/setting.css";
import CommonHeader from "../../../components/common/CommonHeader";
import { BankAccountApi, getBankAccountApi, UpdateBankAccountApi } from "../../../utils/services/user/PaymentServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";
const AddAccountForm = () => {
  const dispatch = useDispatch();
  const [accountDetails, setAccountDetails] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    accountType: "checking",
  });
  const [bankdata, setBankData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };
  const getBankAccount = async () => {
    try {
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

      let res = await getBankAccountApi();
      
      if (res.status && res.message !== "No bank account details found.") {
        setBankData([]);
      } else if (res.bankAccountDetails) {
        setBankData([res.bankAccountDetails]); 
        setAccountDetails({
          accountHolderName: res.bankAccountDetails.accountHolderName || "",
          ifscCode: res.bankAccountDetails.ifscCode || "",
          accountNumber: res.bankAccountDetails.accountNumber || "",
          accountType: res.bankAccountDetails.accountType || "checking",
          bankName: res.bankAccountDetails.bankName || "",
        });
      } else {
        setBankData([]); 
      }
    } catch (error) {
      console.log(error);
      setBankData([]);
    }
    finally{
      setTimeout(() => {
        dispatch(hideLoader());
      }, 2000);
    }
  };
  // Regular expressions for validation
  const accountNumberRegex = /^\d{9,18}$/; // 9 to 18 digits
  const ifscCodeRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/; // Format: ABCD0000123

  // Validation function for the form
  const validateForm = () => {
    const { accountHolderName, accountNumber, ifscCode, bankName, accountType } = accountDetails;

    // Check if all fields are provided
    if (!accountHolderName) {
      toast.error("Account holder name is required.");
      return false;
    }
    if (!accountNumber || !accountNumberRegex.test(accountNumber)) {
      toast.error("Invalid account number! It must be between 9 and 18 digits.");
      return false;
    }
    if (!ifscCode || !ifscCodeRegex.test(ifscCode)) {
      toast.error("Invalid IFSC code! It must follow the format 'ABCD0000123'.");
      return false;
    }
    if (!bankName) {
      toast.error("Bank name is required.");
      return false;
    }
    if (!accountType || !["checking", "savings", "business"].includes(accountType)) {
      toast.error("Account type is required and must be either 'checking', 'savings', or 'business'.");
      return false;
    }

    // If all checks passed
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    if (bankdata.length === 0) {
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
      let body = {
        accountHolderName: accountDetails.accountHolderName,
        accountNumber: accountDetails.accountNumber,
        ifscCode: accountDetails.ifscCode,
        bankName: accountDetails.bankName,
        accountType: accountDetails.accountType,
      };
      let res = await BankAccountApi(body);
      if (res.status) {
        getBankAccount()
        toast.success("Bank Account added successfully");
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      }
    } else {

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
      let body = {
        accountHolderName: accountDetails.accountHolderName,
        accountNumber: accountDetails.accountNumber,
        ifscCode: accountDetails.ifscCode,
        bankName: accountDetails.bankName,
        accountType: accountDetails.accountType,
      };
      let res = await UpdateBankAccountApi(body);
      if (res.status) {
        getBankAccount()
        toast.success("Bank Account updated successfully");
      }
    
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      
    }
  };

 

  useEffect(() => {
    getBankAccount();
  }, []);
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
            
             {(bankdata.length==0)?"Add":"Update"}  Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAccountForm;
