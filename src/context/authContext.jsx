import { createContext, useContext, useMemo, useState } from "react";

// creamos el contexto
const AuthContext = createContext();

// funcion que provee el contexto
export const AuthContextProvider = ({ children }) => {

    // crear el estado del usuario
    const [ user, setUser ] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    // estado allUser que guarda la respuesta 200 ok del register
    const [ allUser, setAllUser ] = useState({
        data:{
            confirmationCode: '',
            user:{
                password: '',
                email: '',
            },
        },
    });

    // funcion puente --> para cuando tengamos problemas de asincronia
    const bridgeData = (state) => {
        const data = localStorage.getItem("data");
        const dataJson = JSON.parse(data);
        console.log(dataJson);
        switch (state) {
            case "ALLUSER":
                setAllUser(dataJson);
                localStorage.removeItem("data");
                break;
        
            default:
                break;
        }
    }

    // funcion login
    const login = (data) => {
        localStorage.setItem('user', data);
        const parseUser = JSON.parse(data);
        setUser(parseUser);
    };

    // funcion logout
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // value --> memoriza los datos con useMemo
    const value = useMemo(() => ({
        user,
        setUser,
        login,
        logout,
        allUser,
        setAllUser,
        bridgeData,
    }), [user, allUser]);

    // el componente del contexto
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

// custom hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
