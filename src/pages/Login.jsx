import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { loginUserService } from "../services/user.service";
import { useLoginError } from "../hooks";
import "./Login.css";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  const { login, setUser } = useAuth();

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await loginUserService(formData));
    setSend(false);
  };

  useEffect(() => {
    console.log('Login 😀', res);
    useLoginError(res, setRes, login, setLoginOk);
  }, [res, login, setLoginOk]);

  useEffect(() => {
    setUser(() => null);
    localStorage.removeItem('user');
  }, [setUser]);

  if (loginOk) {
    if (res.data.user.check === false) {
      return <Navigate to='/verifyCode' />;
    } else {
      return <Navigate to='/dashboard' />;
    }
  }

  return (
    <div className="login-wrap">
      <h1>Login</h1>
      <p>Por favor, introduce tu email y contraseña.</p>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
          <input
            className="input_user"
            type="email"
            id="email"
            name="email"
            autoComplete="false"
            {...register("email", { required: true })}
          />
          <label htmlFor="email" className="custom-placeholder">
            email
          </label>
        </div>
        <div className="form-group">
          <input
            className="input_user"
            type="password"
            id="password"
            name="password"
            autoComplete="false"
            {...register("password", { required: true })}
          />
          <label htmlFor="password" className="custom-placeholder">
            password
          </label>
        </div>
        <div className="btn_container">
          <button
            className="btn"
            type="submit"
            disabled={send}
            style={{ background: send ? "#49c1a388" : "#49c1a2" }}
          >
            LOGIN
          </button>
        </div>
        <p className="bottom-text">
          <small>
            ¿Has olvidado la contraseña?
            <Link to="/forgotpassword" className="anchorCustom">
              Cambiar la contraseña
            </Link>
          </small>
        </p>
      </form>
      <div className="footerForm">
        <p className="parrafoLogin">
          ¿No estás registrado? <Link to="/register" className="anchorCustom">Registrase aqui</Link>
        </p>
      </div>
    </div>
  );
};
