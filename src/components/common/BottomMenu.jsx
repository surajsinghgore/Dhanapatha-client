import { Link } from "react-router-dom";
import "../../style/profile.css";
import { FaUser } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { PiWalletFill } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { RiSettings2Fill } from "react-icons/ri";
const BottomMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="bottom-menu">
      <Link className={`menu-item ${currentPath == "/user/profile" ? "active" : ""}`} to="">
        <FaUser />
        <span>Profile</span>
      </Link>
      <Link className="menu-item" to="/user/dashboard">
        <RiHome2Fill />
        <span>Home</span>
      </Link>
      <Link className="menu-item" to="">
        <PiWalletFill />
        <span>Wallet</span>
      </Link>
      <Link className="menu-item" to="">
        <RiSettings2Fill />
        <span>Settings</span>
      </Link>
    </div>
  );
};

export default BottomMenu;
