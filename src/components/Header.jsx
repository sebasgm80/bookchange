import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/authContext";
import { useWallet } from "../hooks/useWallet";

export const Header = () => {
    const { user, logout } = useAuth();
    const { balance } = useWallet();
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const closeMenu = () => {
        setMenuActive(false);
    };

    return (
        <header className="transparent-header">
            <div className="titleFatherContainer">
                <NavLink to="/" onClick={closeMenu}>
                    <img
                        src="https://res.cloudinary.com/dikiljqbn/image/upload/v1715534240/logo_abzvc9.png"
                        alt="logo"
                        className="logo"
                    />
                </NavLink>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className={`nav-container ${menuActive ? "active" : ""}`}>
                <NavLink to="/" onClick={closeMenu}>
                    <button className="btn btn-transparent">Home</button>
                </NavLink>
                <NavLink to="/Books" onClick={closeMenu}>
                    <button className="btn btn-transparent">Libros</button>
                </NavLink>
                {user ? (
                    <>
                        <NavLink to="/dashboard" onClick={closeMenu}>
                            <button className="btn btn-solid">Dashboard</button>
                        </NavLink>
                        <button className="btn btn-transparent" onClick={() => { logout(); closeMenu(); }}>Logout</button>
                        <button className="BK">BK<br/>{balance}</button>
                        <NavLink to="/profile" onClick={closeMenu}>
                            <img
                                className="profileCircle"
                                src={user.image}
                                alt="profile"
                            />
                        </NavLink>
                    </>
                ) : (
                    <NavLink to="/login" onClick={closeMenu}>
                        <button className="btn btn-transparent">Login</button>
                    </NavLink>
                )}
            </nav>
        </header>
    );
};
