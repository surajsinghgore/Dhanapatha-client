import { useEffect, useState } from "react";
import { recentUsers } from "../../utils/services/user/UserServices";
import RecentCard from "../cards/RecentCard";
import Title from "../common/Title";

import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../redux/Slices/LoaderSlice";
const Recent = () => {
  const [recent, setRecentData] = useState([]);
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
        const resData = await recentUsers();
        setRecentData(resData.receivers);
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
    <div className="recent">
      {recent.length == 0 ? (
        ""
      ) : (
        <>
          <Title titleName="Recent" link="/" linkName="Show All" />
          <div className="usersRecentList">
            {recent?.map((user) => {
              return (
                <div key={user.receiverId}>
                  <RecentCard data={user} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Recent;
