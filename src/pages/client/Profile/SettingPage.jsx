import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomMenu from "../../../components/common/BottomMenu";
import CardMenu from "../../../components/common/CardMenu";
import CardMenuWithoutArrow from "../../../components/common/CardMenuWithoutArrow";
import AccountHeader from "../../../components/profile/AccountHeader";
import "../../../style/setting.css";
import { MdOutlineAccountBalance } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";
import { toast } from "react-toastify";
import ChangePasswordModal from "../../../components/modal/ChangePasswordModal"; // Import the modal component

const SettingPage = () => {
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(showLoader());

    const simulateProgress = () => {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 5;
        dispatch(updateProgress(currentProgress));

        if (currentProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 100);
    };

    simulateProgress();
    toast.success("User logout successfully");
    setTimeout(() => {
      navigate("/auth/login");
      localStorage.clear();
      dispatch(updateProgress(100));
      dispatch(hideLoader());
    }, 2000);
  };

  const handleChangePassword = (currentPassword, newPassword) => {
    // Add your logic to handle password change here
    console.log("Changing password", { currentPassword, newPassword });
    toast.success("Password changed successfully!"); // Show success message
    setChangePasswordModalOpen(false); // Close modal after success
  };

  return (
    <div className="app-container">
      <AccountHeader />
      <div className="settingPageMenu">
        <div className="otherContainer">
          <CardMenu link="/user/add-account" title="Add Bank Account" icon={MdOutlineAccountBalance} />
          <div onClick={() => setChangePasswordModalOpen(true)}>
            <CardMenuWithoutArrow link="" title="Change Password" icon={RiLockPasswordFill} />
          </div>
          <div onClick={logoutUser}>
            <CardMenuWithoutArrow link="/user/add-account" title="Logout Account" icon={RiLogoutBoxRFill} />
          </div>
        </div>
      </div>
      <BottomMenu />

      {/* Render the ChangePasswordModal conditionally */}
      {isChangePasswordModalOpen && <ChangePasswordModal onClose={() => setChangePasswordModalOpen(false)} onChangePassword={handleChangePassword} />}
    </div>
  );
};

export default SettingPage;
