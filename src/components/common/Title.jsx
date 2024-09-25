import { Link } from "react-router-dom";

const Title = ({ titleName, link, linkName }) => {
  return (
    <div className="title">
      <h3>{titleName}</h3>
      <Link to={link}>
        <p title="show all ">{linkName}</p>
      </Link>
    </div>
  );
};

export default Title;
