import Images from "../../constants/Images";
import "../../style/profile.css";

const AccountHeader = () => {
  return (
    <div className="account-header">
      <div className="header-avatar">
        <img src={Images.user} alt="User" className="avatar" />
      </div>
      <div className="header-details">
        <p>wallet balance</p>
        <h1>
          $2,148.<span>41</span>
        </h1>
        <p>Your current balance</p>
      </div>
    </div>
  );
};

export default AccountHeader;
