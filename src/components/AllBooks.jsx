import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../services/book.service';
import { useAuth } from "../context/authContext";
import { useWallet } from "../hooks/useWallet";
import "./AllBooks.css";
import { Link } from 'react-router-dom';
import { purchaseBook } from '../services/message.service';
import Swal from 'sweetalert2';

const AllBooks = () => {
  const { user } = useAuth();
  const { balance, loading: walletLoading, error: walletError } = useWallet();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        if (Array.isArray(data)) {
          const userBooks = user ? data.filter(book => book.userId !== user._id) : data;
          setBooks(userBooks);
          setFilteredBooks(userBooks);
        } else {
          throw new Error('Datos de libros no válidos.');
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [user]);

  useEffect(() => {
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filter || book.genre === filter)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, filter, books]);

  const handlePurchase = async (bookId, bookTitle) => {
    if (balance < books.find(book => book._id === bookId).Bookoins) {
      Swal.fire('Error', 'No tienes suficientes Bookoins para comprar este libro.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas comprar el libro "${bookTitle}" por ${books.find(book => book._id === bookId).Bookoins} Bookoins?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await purchaseBook(bookId);
          setMessage(`Solicitud de compra enviada para el libro: ${bookTitle}`);
        } catch (error) {
          setError(`Error: ${error.message}`);
        }
      }
    });
  };

  if (loading || (user && walletLoading)) return <div className="loading-message">Cargando libros...</div>;
  if (error || (user && walletError)) return <div className="error-message"><h2 className="error-title">{error || walletError}</h2></div>;
  if (message) return <div className="message">{message}</div>;

  return (
    <>
      <div className="search-filter-container">
        <input 
          type="text" 
          placeholder="Buscar por título" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          className="search-input"
        />
        <select 
          value={filter} 
          onChange={e => setFilter(e.target.value)} 
          className="filter-select"
        >
          <option value="">Todos los géneros</option>
          <option value="Fiction">Ficción</option>
          <option value="Non-Fiction">No Ficción</option>
          <option value="Science">Ciencia</option>
          <option value="History">Historia</option>
          <option value="Poetry">Poesía</option>
          <option value="Fantasy">Fantástica</option>
          <option value="Mistery">Misterio</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Horror">Horror</option>
        </select>
      </div>
      <div className="books-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div className="book-card" key={book._id}>
              <Link to={`/book/${book._id}`}>
                <img src={book.image || 'path/to/default-image.jpg'} alt={`Portada de ${book.title}`} />
              </Link>
              <div className="book-info">
                <h2>{book.title}</h2>
                <p className='BK1'>Bookoins: {book.Bookoins}</p>
                {user && book.userId !== user._id && (
                  <button 
                    className={`data-button ${balance < book.Bookoins ? 'disabled' : ''}`} 
                    onClick={() => handlePurchase(book._id, book.title)}
                    disabled={balance < book.Bookoins} 
                  >
                    Comprar
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </>
  );
};

export default AllBooks;
