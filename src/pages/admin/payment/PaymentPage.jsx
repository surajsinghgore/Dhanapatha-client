import PaymentHeader from "../../../components/payment/PaymentHeader";
import LeftPaymentCard from "../../../components/cards/LeftPaymentCard";
import RightPaymentCard from "../../../components/cards/RightPaymentCard";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findReceiverTransaction } from "../../../utils/services/user/PaymentServices";
import { getLocalStorage, getLocalStorageJSON } from "../../../utils/LocalStorage";
import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { user } = useParams();
  const [data, setData] = useState([]);
  const activeUserId = getLocalStorage("user") ? getLocalStorageJSON("user")._id : "";

  // Function to get today's date in dd/MM/yyyy format
  const getTodayDate = () => {
    const today = new Date(); // Get today's date
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const todayDate = getTodayDate();

  // Fetch transactions on component mount
  useEffect(() => {
    (async () => {
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
        const resData = await findReceiverTransaction(user);
        setData(resData.transactions);
      } catch (error) {
        console.log(error);
        dispatch(updateProgress(100));
      } finally {
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      }
    })();
  }, [user]); // Include 'user' as a dependency

  const simpleBarRef = useRef(null);

  // Scroll to the bottom when data is fetched
  useEffect(() => {
    if (simpleBarRef.current) {
      simpleBarRef.current.scrollTop = simpleBarRef.current.scrollHeight;
    }
  }, [data]); // Trigger scrolling when 'data' changes

  return (
    <div className="payment">
      <PaymentHeader />
      <div className="mainBody" ref={simpleBarRef}>
        {data.length === 0 ? (
          <p className="paymentDate">No Transaction Found </p>
        ) : (
          <>
            {data.map((record, index) => (
              <div key={index}>
                <p className="paymentDate">{todayDate === record.date ? "Today" : record.date}</p>
                {record.transactions.map((textData, i) => (textData.senderId === activeUserId ? <RightPaymentCard key={i} data={textData} /> : <LeftPaymentCard key={i} data={textData} />))}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="bottomMenu">
        <Link to="/user/pay-payment">
          <div className="pay">Pay</div>
        </Link>
        <div className="pay">Request</div>
      </div>
    </div>
  );
};

export default PaymentPage;
