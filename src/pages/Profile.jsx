import { useEffect, useState } from "react";
import Messages from "../components/Messages";

import "./Profile.css";
import { Link, NavLink } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";

export const Profile = () => {
  const [user, setUser] = useState({});
  const { balance } = useWallet();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <div className="profile-container">
        <img src={user.image} alt="User Profile" className="profile-image" />
        <h2 className="name">Nombre: {user.user}</h2>
        <p className="email">Email: {user.email}</p>
        <p className="balance">Bookoins: {balance}</p>
      </div>

      <div className="messages-section card">
        <Messages />
      </div>
      <div className="links-section card">
        <Link to="/formProfile" className="profile-link">
          Editar perfil
        </Link>
        <Link to="/addProduct" className="profile-link">
          Añadir libro
        </Link>
        <Link to="/transacctions" className="profile-link">
          Transacciones
        </Link>
      </div>
    </>
  );
};
