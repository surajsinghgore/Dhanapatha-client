import { Link } from "react-router-dom"
import { GoDotFill } from "react-icons/go";
import Images from "../../constants/Images";

const RecentCard = () => {
  return (
    <div className="recentCard">
    <Link to="">
      <div className="profile">
          <GoDotFill  className="notification"/>
        <img src={Images.user} alt="user" />
      </div>
      <p>suraj singh</p>
    </Link>
  </div>
  )
}

export default RecentCard
