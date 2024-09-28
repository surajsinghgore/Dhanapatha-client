import CommonHeader from "../../../components/common/CommonHeader";
import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../../redux/Slices/LoaderSlice";
import { useEffect, useState } from "react";
import HistoryCard from "../../../components/cards/HistoryCard";
import { historyApi } from "../../../utils/services/user/RefundServices";
import { formatDateStr, getCurrentDate } from "../../../utils/formatDate";
const ShowAllHistoryPage = () => {
  const dispatch = useDispatch();
  let todayDate = getCurrentDate();
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
    <div>
      <CommonHeader link="/user/dashboard" title="All Activities Details" />

      <div className="white">
        <div className="transactionCardContainer">
          {history.length != 0 && (
            <>
              {" "}
              {history.map((payment,index) => {
                return (
                  <div key={index}>
                    <p className="dateFull">{todayDate == payment.date ? "Today" : formatDateStr(payment.date)} </p>
                    <div className="transactionCardContainer" key={payment.date}>
                      {payment.allData.slice(0, 5).map((item, index) => (
                        <HistoryCard key={index} data={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAllHistoryPage;
