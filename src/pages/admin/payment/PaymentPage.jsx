import PaymentHeader from "../../../components/payment/PaymentHeader";
import LeftPaymentCard from "../../../components/cards/LeftPaymentCard";
import RightPaymentCard from "../../../components/cards/RightPaymentCard";
import { useEffect, useRef } from "react";
const PaymentPage = () => {
  const simpleBarRef = useRef(null);
  useEffect(() => {
    if (simpleBarRef.current) {
      simpleBarRef.current.scrollTop = simpleBarRef.current.scrollHeight;
    }
  }, []);
  return (
    <div className="payment">
      <PaymentHeader />
      <div className="mainBody" ref={simpleBarRef}>
        <p className="paymentDate">26 december 2024</p>
        <LeftPaymentCard />
        <RightPaymentCard />
        <LeftPaymentCard />
        <RightPaymentCard />
        <LeftPaymentCard />
        <RightPaymentCard />
      </div>

      <div className="bottomMenu">
        <div className="pay">Pay</div>
        <div className="pay">Request</div>
      </div>
    </div>
  );
};

export default PaymentPage;
