import { Link } from "react-router-dom";
import Images from "../../constants/Images";
import "../../style/payment.css";
import { IoArrowBack } from "react-icons/io5";
const PaymentHeader = () => {
  return (
    <div className="payment">
      <div className="header">
        <div className="back">
          <Link to="/user/dashboard">
            <IoArrowBack className="backIcon" title="Go back" />
          </Link>
        </div>
        <div className="profile">
          <div className="images">
            <img src={Images.user} alt="user" />
          </div>
          <div className="text">
            <h4>suraj singh</h4>
            <p>surajthakurrs45@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
