import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../style/commonStyle.css";
import Loader from "../components/common/Loader";
import { useSelector } from "react-redux";
const CommonLayout = ({ children }) => {
  const { loading, progress } = useSelector((state) => state.loader);

  return (
    <div className={"main"}>
      <ToastContainer />
      <div className="screen">
      {loading && <Loader progress={progress} />}
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
