import Images from "../../constants/Images";
import { IoSettingsSharp } from "react-icons/io5";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { findUserByUsernameAndEmail } from "../../utils/services/user/UserServices";
const Header = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const search = async(event) => {
    let res=await findUserByUsernameAndEmail(event.query);
    let data=await res.json();
    console.log(data)


  };

  useEffect(() => {
    // CountryService.getCountries().then((data) => setCountries(data));
  }, []);

  return (
    <header>
      <div className="top">
      <Link to="/user/profile">  <div className="user">
          <div className="image">
            <img src={Images.user} alt="user" />
          </div>
          <div className="text">
            <h6>Suraj singh</h6>
            <h5>suraj@gmail.com</h5>
          </div>
        </div></Link>
        <div className="setting">
        <Link to="/user/profile">  <IoSettingsSharp /></Link>
        </div>
      </div>

      <div className="search">
        <div className="boxAuto">
          <FaSearch className="searchIcon" />
          <AutoComplete
            field="name"
            value={selectedCountries}
            suggestions={filteredCountries}
            completeMethod={search}
            onChange={(e) => setSelectedCountries(e.value)}
            placeholder="Search by username, email address"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
