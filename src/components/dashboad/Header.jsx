import Images from "../../constants/Images";
import { IoSettingsSharp } from "react-icons/io5";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
const Header = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredCountries;

      if (!event.query.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredCountries(_filteredCountries);
    }, 250);
  };

  useEffect(() => {
    // CountryService.getCountries().then((data) => setCountries(data));
  }, []);

  return (
    <header>
      <div className="top">
        <div className="user">
          <div className="image">
            <img src={Images.user} alt="user" />
          </div>
          <div className="text">
            <h6>Suraj singh</h6>
            <h5>suraj@gmail.com</h5>
          </div>
        </div>
        <div className="setting">
          <IoSettingsSharp />
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
