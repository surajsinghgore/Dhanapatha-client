import "../../style/profile.css";

const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <button className="send-btn">
        <span>Send</span>
        <p>Transfer money history</p>
      </button>
      <button className="receive-btn">
        <span>Receive</span>
        <p>Received money history</p>
      </button>
    </div>
  );
};

export default ActionButtons;
