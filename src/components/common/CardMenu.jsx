import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const CardMenu = ({ icon: Icon, title, link }) => {
  return (
    <Link to={link}>
      {" "}
      <li>
        <div className="icon">
        <Icon  />
        </div>
        <div className="text">{title}</div>
        <div className="arrow">
          <MdKeyboardArrowRight />
        </div>
      </li>
    </Link>
  );
};

export default CardMenu;
