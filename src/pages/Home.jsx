import { useNavigate } from 'react-router-dom';
import "./Home.css"; 

export const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="hero">
                <div className="hero-background"></div>
                <div className="hero-content">
                    <h1>Revive Cada Historia – Intercambia Tus Libros Con Amantes de la Lectura Como Tú</h1>
                    <p className="hero-description">Únete a nuestra comunidad y descubre un mundo infinito de libros sin gastar más.</p>
                    <div className="call-to-action">
                        <p className="hero-bonus">¡Regístrate ahora y recibe <b>100 Bookoins</b> para empezar a leer tus primeros libros!</p>
                        <button onClick={() => navigate('/register')} className="join-now-button">Únete Ahora</button>
                    </div>
                </div>
                <div className="hero-footer">
                    <h2>⬇️ Sigue bajando para ver como funciona ⬇️</h2>
                </div>
            </section>
            <section className="how-it-works">
                <div className="steps">
                    <div className="step">
                        <h2>1. Regístrate</h2>
                        <p>Crea una cuenta gratuita en nuestra plataforma.</p>
                    </div>
                    <div className="step">
                        <h2>2. Explora</h2>
                        <p>Busca entre miles de libros disponibles.</p>
                    </div>
                    <div className="step">
                        <h2>3. Intercambia</h2>
                        <p>Intercambia libros con otros usuarios fácilmente.</p>
                    </div>
                    <div className="step">
                        <h2>4. Añade tus libros</h2>
                        <p>Consigue Bookoins con tus libros.</p>
                    </div>
                </div>
            </section>
            <button onClick={() => navigate('/register')} className="join-now-button">Únete Ahora</button>
        </>
    );
}
