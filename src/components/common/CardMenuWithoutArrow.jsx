import { Link } from "react-router-dom";

const CardMenuWithoutArrow = ({ icon: Icon, title, link }) => {
  return (
    <Link to={link}>
      {" "}
      <li>
        <div className="icon">
        <Icon  />
        </div>
        <div className="text">{title}</div>
       
      </li>
    </Link>
  );
};

export default CardMenuWithoutArrow;
