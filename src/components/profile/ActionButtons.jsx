import "../../style/profile.css";

const ActionButtons = ({active,setActive}) => {

  return (
    <div className="action-buttons">
      <button className={`send-btn ${(active)?"activeBtn":""}`} onClick={()=>setActive(true)}>
        <span>Send</span>
        <p>Transfer money history</p>
      </button>
      <button className={`receive-btn ${(!active)?"activeBtn":""}`} onClick={()=>setActive(false)}>
        <span>Received</span>
        <p>Received money history</p>
      </button>
    </div>
  );
};

export default ActionButtons;
