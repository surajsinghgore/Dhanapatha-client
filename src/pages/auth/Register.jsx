import "../../style/auth.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TiArrowRightThick } from "react-icons/ti";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
const Login = () => {
const [passwordState,setPasswordState]=useState({password:false,confirmPassword:false})
  const togglePasswordState=(state)=>{
if(state=="password"){
  setPasswordState({password:!passwordState.password,confirmPassword:passwordState.confirmPassword})
}else{
  setPasswordState({password:passwordState.password,confirmPassword:!passwordState.confirmPassword})

}
  }
  return (
    <div className="auth">
      <div className="intro">
        <h1>Welcome!</h1>
        <p>Log in to your account to manage payments securely and access a seamless payment experience with ease.</p>
      </div>

      <div className="container">
        <div className="form">
          <div className="heading">
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/signup" className="active">
              Signup
            </Link>
          </div>
          <div className="inputBox">
            <li>
              <FaUserCircle className="icon" />
              <input type="text" name="username" placeholder="Enter username " />
            </li>
            <li>
              <HiOutlineMail className="icon" />
              <input type="text" name="email" placeholder="Enter email address" />
            </li>
            <li>
              <RiLockPasswordFill className="icon" />
              <input type={(passwordState.password)?"text":"password"} name="username" placeholder="Enter password" />
              {(passwordState.password)?<IoIosEyeOff className="passIcon" onClick={()=>togglePasswordState("password")}/>
             :<IoMdEye className="passIcon" onClick={()=>togglePasswordState("password")}/>
            }
              
          
            </li>
            <li>
              <RiLockPasswordFill className="icon" />
              <input type={(passwordState.confirmPassword)?"text":"password"} name="username" placeholder="Confirm your password" />
             {(passwordState.confirmPassword)?<IoIosEyeOff className="passIcon" onClick={()=>togglePasswordState("confirmPassword")}/>
             :<IoMdEye className="passIcon" onClick={()=>togglePasswordState("confirmPassword")}/>
            }
              
             
            </li>

            <div className="submit">
              <div className="circle">
                <TiArrowRightThick className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
