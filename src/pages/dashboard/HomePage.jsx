import "../../style/dashboard.css";
import Header from "../../components/dashboad/Header";
import Recent from "../../components/dashboad/Recent";
import Transaction from "../../components/dashboad/Transaction";

const HomePage = () => {
  return (
    <div>
      <Header />

      <div className="white">
        <Recent />
        <Transaction/>
      </div>
    </div>
  );
};

export default HomePage;
