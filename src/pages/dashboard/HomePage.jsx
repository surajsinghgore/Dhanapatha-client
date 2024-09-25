import "../../style/dashboard.css";
import Header from "../../components/dashboad/Header";
import Recent from "../../components/dashboad/Recent";
import Transaction from "../../components/dashboad/Transaction";
import { MdHistory } from "react-icons/md";
import CardMenu from "../../components/common/CardMenu";
import { CiWallet } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
const HomePage = () => {
  return (
    <div>
      <Header />

      <div className="white">
        <Recent />
        <Transaction />

        <div className="otherLink">
          <h2>Manage your money</h2>

          <div className="otherContainer">
            <CardMenu link="/user/all-transaction" title="See transaction history" icon={MdHistory} />
            <CardMenu link="/" title="Check wallet balance" icon={CiBank} />
            <CardMenu link="/user/all-transaction" title="Check wallet history" icon={CiWallet} />

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
