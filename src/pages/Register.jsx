import "./Register.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Uploadfile } from "../components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { registerUser } from "../services/user.service";
import { useRegisterError } from "../hooks/useRegisterError";

export const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { allUser, setAllUser, bridgeData } = useAuth();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [okRegister, setOkRegister] = useState(false);

    const formSubmit = async (formData) => {
        const inputFile = document.getElementById('file-upload').files;
        const customFormData = inputFile.length !== 0
            ? { ...formData, image: inputFile[0] }
            : { ...formData };

        setSend(true);
        setRes(await registerUser(customFormData));
        setSend(false);
    };

    useEffect(() => {
        useRegisterError(res, setOkRegister, setRes);
        if (res?.status === 200) bridgeData("ALLUSER");
    }, [res]);

    useEffect(() => {
        console.log("Usuarios registrados:", allUser);
    }, [allUser]);

    if (okRegister) {
        return <Navigate to='/login' />;
    }

    return (
        <>
            <div className="form-wrap">
                <div className="form-header">
                <h1>Crea tu cuenta</h1>
                <p>Es gratis y solo te tomará un minuto</p>
                </div>
                <form className="form" onSubmit={handleSubmit(formSubmit)}>
                    <div className="user_container form-group">
                        <input
                            className="input_user"
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="off"
                            {...register("name", { required: true })}
                        />
                        <label htmlFor="name" className="custom-placeholder">
                            Nombre de usuario
                        </label>
                    </div>
                    <div className="password_container form-group">
                        <input
                            className="input_user"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            {...register("password", { required: true })}
                        />
                        <label htmlFor="password" className="custom-placeholder">
                            Contraseña
                        </label>
                    </div>
                    <div className="email_container form-group">
                        <input
                            className="input_user"
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            {...register("email", { required: true })}
                        />
                        <label htmlFor="email" className="custom-placeholder">
                            Correo electrónico
                        </label>
                        <Uploadfile />
                    </div>
                    <div className="btn_container">
                        <button
                            className="btn1"
                            type="submit"
                            disabled={send}
                            style={{ background: send ? "#49c1a388" : "#2f7a67" }}
                        >
                            {send ? "Cargando..." : "Registrar"}
                        </button>
                    </div>
                    <p className="bottom-text">
                        <small>
                            Al hacer clic en el botón de Registro, estás aceptando nuestros
                            <Link className="anchorCustom" to="/terms"> Términos & Condiciones </Link> y
                            <Link className="anchorCustom" to="/privacy"> Política de Privacidad</Link>.
                        </small>
                    </p>
                </form>
            </div>
            <div className="footerForm">
                <p className="parrafoLogin">
                    ¿Tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            </div>
        </>
    );
};
