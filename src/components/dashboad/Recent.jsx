import RecentCard from "../cards/RecentCard";
import Title from "../common/Title";
const Recent = () => {
  return (
    <div className="recent">
      <Title titleName="Recent" link="/" linkName="Show All" />

      <div className="usersRecentList">
      <RecentCard/>
      <RecentCard/>
      <RecentCard/>
      <RecentCard/>
      <RecentCard/>
      <RecentCard/>
      <RecentCard/>
      </div>
    </div>
  );
};

export default Recent;
