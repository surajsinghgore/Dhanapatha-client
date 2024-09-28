

const RightPaymentCard = ({ data }) => {
  const [day, month, year] = data.date.split("/").map(Number);
  const transactionDate = new Date(year, month - 1, day);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = transactionDate.toLocaleDateString('en-US', options);

  return (
    <div className="containerLeft">
      <div className="left">
        <div className="amount">
        ₹ <span>{data.amount}</span>
        </div>

        <div className="details">{data.status}. {formattedDate}</div>
      </div>
    </div>
  );
};

export default RightPaymentCard;



