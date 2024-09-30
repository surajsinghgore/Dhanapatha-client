import { useState } from "react";
import { toast } from "react-toastify";

const ChangePasswordModal = ({ onClose, onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const validatePassword = (password) => {
    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain at least one number.");
      return false;
    }
    if (!/[\W_]/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (currentPassword == "") {
      toast.error("Enter current password");
      return;
    }
    if (newPassword == "") {
      toast.error("Enter New password");
      return;
    }
    if (confirmPassword == "") {
      toast.error("Enter Confirm  password");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (!validatePassword(newPassword)) {
      return;
    }

    // Check if new password is same as current password
    if (currentPassword === newPassword) {
      toast.error("New password cannot be the same as the current password.");
      return;
    }

    // Proceed if all validations pass
    onChangePassword(currentPassword, newPassword);
  };

  const handleClickOutside = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content">
        <h2>Change Password</h2>
        <input
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          placeholder="Current Password"
          className="password-input"
        />
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="New Password"
          className="password-input"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm New Password"
          className="password-input"
        />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn-modal">
            Cancel
          </button>
          <button onClick={handleSubmit} className="submit-btn-modal">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
