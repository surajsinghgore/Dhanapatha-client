import '../style/commonStyle.css';
const CommonLayout = ({ children }) => {


  return (
    <div className={"main"}> 
    <div className="screen">
       {children}
    </div>
    </div>
  );
};

export default CommonLayout;