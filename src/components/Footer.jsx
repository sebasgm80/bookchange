import "./Footer.css";  // Asegúrate de que este archivo está correctamente enlazado y existe en tu proyecto.

export const Footer = () => {
  const currentYear = new Date().getFullYear();  // Esta línea obtiene el año actual automáticamente.

  return (
    <>
        <footer className="footer">
            <h4 className="footer-text">© {currentYear} BookChange. Todos los derechos reservados.</h4>
        </footer>
    </>
  )
}
