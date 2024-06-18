import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBookDetails } from '../services/book.service';
import './BookDetails.css';

export const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookDetails(bookId);
        setBook(data);
      } catch (error) {
        setError('No se pudo cargar la información del libro.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-details">
      {book && (
        <>
          <div className="book-details-content">
            {book.image && <img src={book.image} alt={book.title} className="book-image" />}
            <div className="book-info">
              <h1>{book.title || 'Título no disponible'}</h1>
              <p><strong>Autor:</strong> {book.author || 'No disponible'}</p>
              <p><strong>Género:</strong> {book.genre || 'No disponible'}</p>
              <p><strong>Año:</strong> {book.year || 'No disponible'}</p>
              <p><strong>Páginas:</strong> {book.pages}</p>
              <p className="bookoins"><strong>Bookoins:</strong> {book.Bookoins}</p>
              <p><strong>Subido por:</strong> {book.userId?.name || 'Usuario desconocido'}</p>
            </div>
          </div>
          <div className="book-details-buttons">
            <Link to="/dashboard"><button>Dashboard</button></Link>
            <Link to="/books"><button>Todos los libros</button></Link>
          </div>
        </>
      )}
    </div>
  );
};
