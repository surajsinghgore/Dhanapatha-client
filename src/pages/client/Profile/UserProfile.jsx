import { useEffect, useState } from "react";
import BottomMenu from "../../../components/common/BottomMenu";
import AccountHeader from "../../../components/profile/AccountHeader";
import ActionButtons from "../../../components/profile/ActionButtons";
import { receiverData, senderData } from "../../../utils/services/user/PaymentServices";
import UserTransactionList from "../../../components/profile/UserProfileTransaction";
import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";
const UserProfile = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const switchActive = async () => {
    if (active) {
      try {
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
        let res = await senderData();
        if (res.success) {
          setTransaction(res.transactions);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      }
    } else {
      try {
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
        let res = await receiverData();
        if (res.success) {
          setTransaction(res.transactions);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      }
    }
  };

  useEffect(() => {
    switchActive();
  }, [active]);
  return (
    <div className="app-container">
      <AccountHeader />
      <ActionButtons active={active} setActive={setActive} />
      <UserTransactionList data={transaction} />
      <BottomMenu />
    </div>
  );
};

export default UserProfile;
