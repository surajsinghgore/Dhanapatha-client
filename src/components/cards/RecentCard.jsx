import { GoDotFill } from "react-icons/go";
import Images from "../../constants/Images";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/LocalStorage";

const RecentCard = ({ data }) => {
  const navigate = useNavigate();

  const selectedUser = async (item) => {
    setLocalStorage("paymentUser", JSON.stringify(item));
    navigate(`/user/payment/${item.email}`);
  };
  return (
    <div className="recentCard" onClick={() => selectedUser(data)}>
      <div className="profile">
        <GoDotFill className="notification" />
        <img src={Images.user} alt="user" />
      </div>
      <p>{data?.username}</p>
    </div>
  );
};

export default RecentCard;
