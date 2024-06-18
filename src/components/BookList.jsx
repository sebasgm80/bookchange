import React, { useEffect, useState } from 'react';
import { deleteBook, getUserBooks } from '../services/book.service';
import "./BookList.css";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getUserBooks();
                if (booksData.length === 0) {
                    setError(<h3 className="no-books-message">No tienes libros en tu biblioteca.<Link to="/addProduct"><p className="add-book-button">Añade un libro</p></Link></h3>);
                } else {
                    setBooks(booksData);
                }
            } catch (error) {
                setError('Error en la obtención de libros. Por favor, intenta de nuevo más tarde.');
                console.error('Error en la obtención de libros:', error);
            }
            setLoading(false);
        };

        fetchBooks();
    }, []);

    const handleDelete = async (book) => {
        Swal.fire({
            title: `¿Estás seguro de que quieres eliminar "${book.title}"?`,
            text: `Autor: ${book.author || 'Desconocido'}\nGénero: ${book.genre || 'Desconocido'}\nAño: ${book.year || 'Desconocido'}\nSe eliminará permanentemente este libro de la biblioteca`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteBook(book._id);
                    setBooks(books.filter((b) => b._id !== book._id));
                    Swal.fire(
                        '¡Eliminado!',
                        'El libro ha sido eliminado de la biblioteca',
                        'success'
                    );
                } catch (error) {
                    console.error('Error al eliminar el libro:', error);
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar el libro. Por favor, intenta de nuevo más tarde.',
                        'error'
                    );
                }
            }
        });
    };

    if (loading) return <div>Cargando libros...</div>;
    if (error) return <div>{error}</div>; 

    return (
        <>
        <div className="books-container">
            {books.map(book => (
                <div className="book-card" key={book._id}>
                    <Link to={`/book/${book._id}`}>
                        <img src={book.image || 'path/to/default-image.jpg'} alt={`Portada de ${book.title}`} />
                    </Link>
                    <div className="book-info">
                        <h2>{book.title}</h2>
                        <p className='BK1'>Bookoins: {book.Bookoins}</p>
                        <div className="book-actions">
                            <Link to={`/update/${book._id}`}>
                                <button className='data-button'>Actualizar</button>
                            </Link>
                            <button className='data-button' onClick={() => handleDelete(book)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
    
};


export default BooksList;
