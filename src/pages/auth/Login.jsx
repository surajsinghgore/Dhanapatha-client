import "../../style/auth.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";
const Login = () => {
  return (
    <div className="auth">
      <div className="intro">
        <h1>Welcome!</h1>
        <p>Log in to your account to manage payments securely and access a seamless payment experience with ease.</p>
      </div>

      <div className="container">
        <div className="form">
          <div className="heading">
            <Link to="/auth/login" className="active">Login</Link>
            <Link to="/auth/signup">Signup</Link>
          </div>
          <div className="inputBox">
            <li>
              <HiOutlineMail className="icon"/>
              <input type="text" name="username" placeholder="Enter username or email address" />
            </li>
            <li>
              <RiLockPasswordFill className="icon"/>
              <input type="text" name="username" placeholder="Password" />
            </li>

            <div className="submit">
              <div className="circle">
                <TiArrowRightThick  className="icon"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
