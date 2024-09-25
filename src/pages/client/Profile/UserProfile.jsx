import BottomMenu from "../../../components/common/BottomMenu";
import AccountHeader from "../../../components/profile/AccountHeader";
import ActionButtons from "../../../components/profile/ActionButtons";
import TransactionList from "../../../components/profile/TransactionList";


const UserProfile = () => {
  return (
    <div className="app-container">
      <AccountHeader />
      <ActionButtons />
      <TransactionList />
      <BottomMenu/>
    </div>
  );
};

export default UserProfile;
