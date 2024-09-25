import { ProgressBar } from "primereact/progressbar";
import Images from "../../constants/Images";
import "primereact/resources/themes/saga-blue/theme.css";

const Loader = ({ progress }) => {
  return (
    <div className="loader">
      <div className="blur"></div>
      <div className="loaderContainer">
        <div className="contain">
          <img src={Images.logo} alt="logo" />
        </div>
        <div className="progressBar">
          <ProgressBar value={progress} color="#2E878A" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
