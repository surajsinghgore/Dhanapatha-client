import "../../style/auth.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { loginUserApi } from "../../utils/services/auth/AuthApi";
import { setLocalStorage } from "../../utils/LocalStorage";

import { useDispatch } from "react-redux";
import { showLoader, updateProgress, hideLoader } from "../../redux/Slices/LoaderSlice";

const loginValidation = yup.object({
  usernameOrEmail: yup.string().required("Username or email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      toast.error(firstError);
      return;
    }
  }, [errors]);

  const onSubmit = async (formData) => {
    dispatch(showLoader());
    const simulateProgress = () => {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 4;
        dispatch(updateProgress(currentProgress));

        if (currentProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 100);
    };

    simulateProgress();

    try {
      const response = await loginUserApi(formData);

      if (response?.success) {

        dispatch(updateProgress(100));
        setLocalStorage("token", response.token);
        setLocalStorage("user", JSON.stringify(response.user));
        toast.success(response.message);

        setTimeout(() => {
          navigate("/user/dashboard");
        }, 1500);
      } else {
        dispatch(updateProgress(100));
      }
    } catch (error) {
      console.log(error);
      dispatch(updateProgress(100));
    } finally {
      setTimeout(() => {
        dispatch(hideLoader());
      }, 2000);
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
          <div className="heading">
            <Link to="/auth/login" className="active">
              Login
            </Link>
            <Link to="/auth/signup">Signup</Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            {/* Use handleSubmit here */}
            <div className="inputBox">
              <li>
                <HiOutlineMail className="icon" />
                <input type="text" placeholder="Enter username or email address" {...register("usernameOrEmail")} />
              </li>
              <li>
                <RiLockPasswordFill className="icon" />
                <input type="password" placeholder="Password" {...register("password")} />
              </li>

              <button type="submit" className="submit">
                {" "}
                {/* Submit button */}
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

export default Login;
