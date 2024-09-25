import { useState, useEffect } from "react";
import "../../../style/paymentstatus.css";
import tickSound from "../../../assets/tune/complete.mp3";

function PaymentStatus() {
  const [showTick, setShowTick] = useState(false);
  const [audio] = useState(new Audio(tickSound));

  const handleShowTick = () => {
    setShowTick(true);
    audio.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  };

  useEffect(() => {
   
    const timer = setTimeout(() => {
      handleShowTick();
    }, 100); 

 
    return () => clearTimeout(timer);
  }, []);

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
