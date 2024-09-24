import "react-toastify/dist/ReactToastify.css";
import {  ToastContainer } from "react-toastify";
import '../style/commonStyle.css';
const CommonLayout = ({ children }) => {

  return (
    <div className={"main"}>
        <ToastContainer /> 
    <div className="screen">
       {children}
    </div>
    </div>
  );
};

export default CommonLayout;