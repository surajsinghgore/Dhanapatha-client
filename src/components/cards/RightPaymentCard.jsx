import { RiRefund2Fill } from "react-icons/ri";
import { refundApi } from "../../utils/services/user/RefundServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../redux/Slices/LoaderSlice";

const RightPaymentCard = ({ data }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [day, month, year] = data.date.split("/").map(Number);
  const [hours, minutes, seconds] = data.time.split(":").map(Number);

  const transactionDate = new Date(year, month - 1, day, hours, minutes, seconds);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = transactionDate.toLocaleDateString("en-US", options);

  const now = new Date();

  const isRefundable = now - transactionDate <= 3 * 60 * 60 * 1000; // 3 hours in milliseconds

  const refundTransaction = async (payment) => {
    let body = { transactionId: payment.transactionId };
    dispatch(showLoader());
    const simulateProgress = () => {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 4;
        dispatch(updateProgress(currentProgress));

        if (currentProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 100);
    };

    simulateProgress();

    try {
      let res = await refundApi(body);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          navigate("/user/payment-status");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      dispatch(updateProgress(100));
    } finally {
      setTimeout(() => {
        dispatch(hideLoader());
      }, 2000);
    }
  };
  return (
    <div className="containerRight">
      <div className="right">
        <div className="amount">
          ₹ <span>{data.amount}</span>
        </div>

        <div className="details">
          {data.status == "completed" ? "Paid" : "Refunded"}. {formattedDate}
        </div>
        <div onClick={() => refundTransaction(data)}>{data.status !== "refunded" && <RiRefund2Fill className="refundIcon" title="Refund Transaction" />}</div>
      </div>
    </div>
  );
};

export default RightPaymentCard;
