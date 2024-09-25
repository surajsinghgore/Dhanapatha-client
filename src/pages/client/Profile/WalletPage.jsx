import { useState } from 'react';
import '../../../style/profile.css';
import Modal from '../../../components/modal/AddWalletMoneyModal';
import TransactionList from '../../../components/profile/TransactionList';
import AccountHeader from '../../../components/profile/AccountHeader';
import BottomMenu from '../../../components/common/BottomMenu';
import WithdrawalMoneyModal from '../../../components/modal/WithdrawalMoneyModal';

const WalletPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [balance, setBalance] = useState(2148.41);

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

//   amount 
  const handleWithdrawalBalance = (amount) => {
    setBalance(balance + amount);
    setShowWithdrawalModal(false);
  };

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
        <h3>Wallet Money Transaction History</h3>
        <TransactionList />
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal} onAddBalance={handleAddBalance} />
      )}
      
      {showWithdrawalModal && (
        <WithdrawalMoneyModal onClose={handleCloseWithdrawalModal} onAddBalance={handleWithdrawalBalance} />
      )}
      
      <BottomMenu />
    </div>
  );
};

export default WalletPage;
