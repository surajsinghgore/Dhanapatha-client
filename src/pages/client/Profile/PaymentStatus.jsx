import { useState, useEffect } from "react";
import "../../../style/paymentstatus.css";
import tickSound from "../../../assets/tune/complete.mp3";
import { useNavigate } from "react-router-dom";
import {  getLocalStorageJSON } from "../../../utils/LocalStorage";

function PaymentStatus() {
  const [showTick, setShowTick] = useState(false);
  const navigate = useNavigate();

  const handleShowTick = () => {
    setShowTick(true);
   
  };

  useEffect(() => {
   
    const timer = setTimeout(() => {
      handleShowTick();
    }, 100); 

 
    return () => clearTimeout(timer);
  }, []);


  // redirect auto
  useEffect(()=>{
setTimeout(()=>{
  navigate(`/user/payment-status`);
  navigate(`/user/payment/${getLocalStorageJSON("paymentUser").email}`);

},2500)
  },[])
  return (
    <div className="container" onClick={handleShowTick}>
      {showTick && (
        <main>
          <div className="tick">&#10003;</div>
        </main>
      )}
    </div>
  );
}

export default PaymentStatus;
