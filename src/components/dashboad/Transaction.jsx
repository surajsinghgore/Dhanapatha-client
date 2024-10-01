import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../redux/Slices/LoaderSlice";
import { historyApi } from "../../utils/services/user/RefundServices";
import HistoryCard from "../cards/HistoryCard";
const Transaction = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
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
        const resData = await historyApi();

        setHistory(resData.history.slice(0, 5));
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
    <div className="transaction">
      {history.length != 0 && (
        <>
          {" "}
          <h2>Recent Activity</h2>
          <div className="transactionCardContainer">
            {(() => {
              const allDataCombined = history.flatMap((payment) => payment.allData);

              const limitedData = allDataCombined.slice(0, 5);

              return limitedData.map((item, index) => <HistoryCard key={index} data={item} />);
            })()}
          </div>
          <div className="bottom">
            <Link to="/user/all-history">See more</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Transaction;
