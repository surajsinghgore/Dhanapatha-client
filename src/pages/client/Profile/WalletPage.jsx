import  { useEffect, useState } from "react";
import "../../../style/profile.css";
import Modal from "../../../components/modal/AddWalletMoneyModal";
import TransactionList from "../../../components/profile/TransactionList";
import AccountHeader from "../../../components/profile/AccountHeader";
import BottomMenu from "../../../components/common/BottomMenu";
import WithdrawalMoneyModal from "../../../components/modal/WithdrawalMoneyModal";
import { toast } from "react-toastify";
import { getWithdrawalMoney, withdrawalMoney, createPaymentIntent } from "../../../utils/services/user/PaymentServices";
import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";
import { toggleLoader } from "../../../redux/Slices/ApiHitState";
import { useNavigate } from "react-router-dom";

const WalletPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [transaction, setTransaction] = useState([]);

  const handleAddBalanceClick = () => {
    setShowModal(true);
  };

  const handleWithdrawalBalanceClick = () => {
    setShowWithdrawalModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseWithdrawalModal = () => {
    setShowWithdrawalModal(false);
  };

  // Add balance
  const handleAddBalance = async (amount) => {
    if (amount === "" || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
  
    try {
      dispatch(showLoader());
      const { clientSecret, status } = await createPaymentIntent({ amount: parseFloat(amount) }); // Send amount in rupees
  
      if (status) {
   
        navigate("/user/stripe-pay", {
          state: {
            clientSecret: clientSecret,
            amount: amount, 
          },
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      dispatch(hideLoader());
    }
  };


  useEffect(() => {
    (async () => {
      dispatch(showLoader());
      try {
        const resData = await getWithdrawalMoney();
        if (resData.success) {
          setTransaction(resData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hideLoader());
      }
    })();
  }, []);

  const handleWithdrawalBalance = async (amount) => {
    if (amount === "" || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
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

    let body = { amount: parseFloat(amount) };

    try {
      const res = await withdrawalMoney(body);
      if (res.success) {
        dispatch(toggleLoader());
        toast.success(`Withdrawal of ₹${res.withdrawal.amount} was successful.`);
        setTimeout(() => {
          setShowWithdrawalModal(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
    } finally {
      setTimeout(() => {
        dispatch(hideLoader());
      }, 2000);
    }
  };

  return (
    <div className="app-container">
      <AccountHeader />

      <div className="action-buttons">
        <button className="send-btn walletBtn" onClick={handleAddBalanceClick}>
          <span>Add Money</span>
          <p>add money to wallet</p>
        </button>

        <button className="send-btn walletBtn" onClick={handleWithdrawalBalanceClick}>
          <span>Withdrawal Money</span>
          <p>withdrawal money to bank account</p>
        </button>
      </div>

      <div className="transaction-history">
        <h3 style={{ marginLeft: "10px" }}>Wallet Money Transaction History</h3>
        {transaction.length === 0 ? (
          <p>No withdrawal record found</p>
        ) : (
          <div className="transaction-list">
            {transaction.transactionSummary?.map((record) => (
              <div key={record._id}>
                <h3 style={{ margin: "10px 0" }}>
                  Transactions on {record._id} ({record.count} transactions)
                </h3>
                {record.records?.map((item) => (
                  <div key={item._id}>
                    <TransactionList data={item} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && <Modal onClose={handleCloseModal} onAddBalance={handleAddBalance} />}
      {showWithdrawalModal && <WithdrawalMoneyModal onClose={handleCloseWithdrawalModal} onAddBalance={handleWithdrawalBalance} />}

      <BottomMenu />
    </div>
  );
};

export default WalletPage;
