import { useEffect, useState } from "react";
import "../../../style/profile.css";
import Modal from "../../../components/modal/AddWalletMoneyModal";
import TransactionList from "../../../components/profile/TransactionList";
import AccountHeader from "../../../components/profile/AccountHeader";
import BottomMenu from "../../../components/common/BottomMenu";
import WithdrawalMoneyModal from "../../../components/modal/WithdrawalMoneyModal";
import { toast } from "react-toastify";
import { getWithdrawalMoney, withdrawalMoney } from "../../../utils/services/user/PaymentServices";

import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";
import { toggleLoader } from "../../../redux/Slices/ApiHitState";
const WalletPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [balance, setBalance] = useState(0);
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
  // amount
  const handleAddBalance = (amount) => {
    setBalance(balance + amount);
    setShowModal(false);
  };

  //   withdrawal amount
  const handleWithdrawalBalance = async (amount) => {
    setBalance(balance + amount);
    if (amount == "") {
      toast.error("Please Enter amount");
      return;
    }
    let amountTotal = parseFloat(amount);

    if (amountTotal <= 0) {
      toast.error("Amount must be at least above 0");
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
    let body = { amount: amountTotal };
    try {
      let res = await withdrawalMoney(body);
      if (res.success) {
        dispatch(toggleLoader());

        toast.success(`Withdrawal of amount ${res.withdrawal.amount} was successful.`);
        setTimeout(() => {
          setShowWithdrawalModal(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        dispatch(hideLoader());
      }, 2000);
    }
  };

  useEffect(() => {
    (async () => {
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
        const resData = await getWithdrawalMoney();
        console.log(resData);
        if (resData.success) {
          setTransaction(resData);
        }
      } catch (error) {
        console.log(error);
        dispatch(updateProgress(100));
      } finally {
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      }
    })();
  }, []);
  return (
    <div className="app-container">
      <AccountHeader />

      <div className="action-buttons ">
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
        <h3 style={{marginLeft:"10px"}}>Wallet Money Transaction History</h3>
        {transaction.length === 0 ? (
          <p>No withdrawal record found</p>
        ) : (
          <div className="transaction-list">
            {transaction.transactionSummary.map((record) => (
              <div key={record._id}>
                <h3 style={{margin:"10px 0"}}>
                  Transactions on {record._id} ({record.count} transactions)
                </h3>
                {record.records.map((item) => (
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
