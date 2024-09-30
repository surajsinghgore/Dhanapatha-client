import { useEffect, useState } from "react";
import Images from "../../constants/Images";
import "../../style/profile.css";
import { getBalance } from "../../utils/services/user/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../redux/Slices/LoaderSlice";
const AccountHeader = () => {
  const [amount, setAmount] = useState({ balance: 0 });
  const [integerPart, decimalPart] = amount.balance.toFixed(2).split(".");
  const isLoading = useSelector((state) => state.apiHit.state);
  const dispatch = useDispatch();
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
        const resData = await getBalance();
        setAmount(resData.data);
      } catch (error) {
        console.log(error);
        dispatch(updateProgress(100));
      } finally {
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      }
    })();
  }, [isLoading]);
  return (
    <div className="account-header">
      <div className="header-avatar">
        <img src={Images.user} alt="User" className="avatar" />
      </div>
      <div className="header-details">
        <p>wallet balance</p>
        <h1>
          ₹ {integerPart}.<span>{decimalPart}</span>
        </h1>
        <p>Your current balance</p>
      </div>
    </div>
  );
};

export default AccountHeader;
