import { useState } from "react";

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

  const handleSubmit = () => {
    if (newPassword && newPassword === confirmPassword) {
      onChangePassword(currentPassword, newPassword);
    } else {
      alert("New passwords do not match!");
    }
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
