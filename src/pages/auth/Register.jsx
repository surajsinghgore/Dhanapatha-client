import "../../style/auth.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TiArrowRightThick } from "react-icons/ti";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUserValidation } from "../../utils/services/formvalidation/Validation";
import { registrationUserApi } from "../../utils/services/auth/AuthApi";
import { toast } from "react-toastify";
import { setLocalStorage } from "../../utils/LocalStorage";

const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerUserValidation) });
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      toast.error(firstError);
      return;
    }
  }, [errors]);
  const [passwordState, setPasswordState] = useState({ password: false, confirmPassword: false });

  const togglePasswordState = (state) => {
    setPasswordState((prevState) => ({
      ...prevState,
      [state]: !prevState[state],
    }));
  };

  const onSubmit = async (formData) => {
    try {
      const response = await registrationUserApi(formData);
      if (response?.success) {
        setLocalStorage("token", response.token);
        toast.success(response.message);
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="auth">
      <div className="intro">
        <h1>Welcome!</h1>
        <p>Log in to your account to manage payments securely and access a seamless payment experience with ease.</p>
      </div>
      <div className="container">
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="heading">
              <Link to="/auth/login">Login</Link>
              <Link to="/auth/signup" className="active">
                Signup
              </Link>
            </div>
            <div className="inputBox">
              <li>
                <FaUserCircle className="icon" />
                <input type="text" name="username" placeholder="Enter username" {...register("username")} />
              </li>
              <li>
                <HiOutlineMail className="icon" />
                <input type="text" name="email" placeholder="Enter email address" {...register("email")} />
              </li>
              <li>
                <RiLockPasswordFill className="icon" />
                <input type={passwordState.password ? "text" : "password"} name="password" placeholder="Enter password" {...register("password")} />
                {passwordState.password ? (
                  <IoIosEyeOff className="passIcon" onClick={() => togglePasswordState("password")} />
                ) : (
                  <IoMdEye className="passIcon" onClick={() => togglePasswordState("password")} />
                )}
              </li>
              <li>
                <RiLockPasswordFill className="icon" />
                <input type={passwordState.confirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password" {...register("confirmPassword")} />
                {passwordState.confirmPassword ? (
                  <IoIosEyeOff className="passIcon" onClick={() => togglePasswordState("confirmPassword")} />
                ) : (
                  <IoMdEye className="passIcon" onClick={() => togglePasswordState("confirmPassword")} />
                )}
              </li>

              <button type="submit" className="submit">
                <div className="circle">
                  <TiArrowRightThick className="icon" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
