import { Link } from "react-router-dom";

import "../../style/payment.css";
import { IoArrowBack } from "react-icons/io5";
const CommonHeader = ({link,title}) => {
  return (
    <div className="payment">
      <div className="header">
        <div className="back">
          <Link to={link}>
            <IoArrowBack className="backIcon" title="Go back" />
          </Link>
        </div>
        <div className="commonTitleHeading">
       { title}
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
