import Images from "../../constants/Images";
import { IoSettingsSharp } from "react-icons/io5";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { findUserByUsernameAndEmail } from "../../utils/services/user/UserServices";
const Header = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const searchUser = async (event) => {
    const query = event.query.toLowerCase();
    try {
      const users = await findUserByUsernameAndEmail(query);
      const results = users.users.filter((user) => user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));
      setFilteredUsers(results);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const searchUserClick = (item) => {
    navigate(`/user/payment/${item.email}`);
  };

  return (
    <header>
      <div className="top">
        <Link to="/user/profile">
          {" "}
          <div className="user">
            <div className="image">
              <img src={Images.user} alt="user" />
            </div>
            <div className="text">
              <h6>Suraj singh</h6>
              <h5>suraj@gmail.com</h5>
            </div>
          </div>
        </Link>
        <div className="setting">
          <Link to="/user/profile">
            {" "}
            <IoSettingsSharp />
          </Link>
        </div>
      </div>

      <div className="search">
        <div className="boxAuto">
          <FaSearch className="searchIcon" />
          <AutoComplete
            field="username"
            value={selectedUser}
            suggestions={filteredUsers}
            completeMethod={searchUser}
            onChange={(e) => setSelectedUser(e.value)}
            placeholder="Search by username, email address"
            itemTemplate={(item) => (
              <div onClick={() => searchUserClick(item)}>
                <strong>{item.username}</strong> - {item.email}
              </div>
            )}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
