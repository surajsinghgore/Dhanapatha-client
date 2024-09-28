import { RiRefund2Fill } from "react-icons/ri";

const RightPaymentCard = ({ data }) => {
  const [day, month, year] = data.date.split("/").map(Number);
  const [hours, minutes, seconds] = data.time.split(":").map(Number);
  
  const transactionDate = new Date(year, month - 1, day, hours, minutes, seconds);
  
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = transactionDate.toLocaleDateString('en-US', options);

  const now = new Date();
  
  const isRefundable = (now - transactionDate) <= 3 * 60 * 60 * 1000; // 3 hours in milliseconds

  return (
    <div className="containerRight">
      <div className="right">
        <div className="amount">
          ₹ <span>{data.amount}</span>
        </div>

        <div className="details">{data.status}. {formattedDate}</div>
        
       <RiRefund2Fill className="refundIcon" title="Refund Transaction" />
      </div>
    </div>
  );
};

export default RightPaymentCard;
