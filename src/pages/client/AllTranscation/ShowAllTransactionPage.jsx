import TransactionCard from "../../../components/cards/TransactionCard";
import CommonHeader from "../../../components/common/CommonHeader";
import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";
import { getTransaction } from "../../../utils/services/user/UserServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ShowAllTransactionPage = () => {
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState([]);
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
        const resData = await getTransaction();
        setTransaction(resData.transactions);
      } catch (error) {
        console.log(error);
        dispatch(updateProgress(100));
      } finally {
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      }
    })();
  }, []);

  return (
    <div>
      <CommonHeader link="/user/dashboard" title="All Transaction Details" />

      <div className="white">
        <div className="transactionCardContainer">
          {/* <p className="dateFull">26 december 2024</p> */}
          {transaction.length != 0 && (
            <>
              {" "}
              {/* <h2>Recent Activity</h2> */}
              <div className="transactionCardContainer">
                {transaction.map((payment) => {
                  return (
                    <div key={payment.transactionId}>
                      <TransactionCard data={payment} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAllTransactionPage;
