import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getBookDetails, updateBook } from '../services/book.service';
import './UpdateBookForm.css';

const UpdateBookForm = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    pages: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookDetails(bookId);
        setBook({
          title: data.title || '',
          author: data.author || '',
          genre: data.genre || '',
          year: data.year || '',
          pages: data.pages || '',
          image: data.image || ''
        });
        setImagePreview(data.image || '');
        setLoading(false);
      } catch (error) {
        setError('No se pudo cargar la información del libro.');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setBook((prevBook) => ({
          ...prevBook,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(book.image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Actualizando libro...',
      text: 'Por favor, espera mientras se actualiza el libro.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await updateBook(bookId, book);
      Swal.fire('¡Éxito!', 'El libro se ha actualizado correctamente', 'success');
      navigate('/dashboard');
    } catch (error) {
      setError('No se pudo actualizar el libro. Por favor, intenta de nuevo más tarde.');
      Swal.fire('Error', 'No se pudo actualizar el libro. Intenta de nuevo.', 'error');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Actualizar libro</h1>
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <input
        type="text"
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="Autor"
      />
      <select name="genre" value={book.genre} onChange={handleChange} required>
        <option value="">Selecciona un género</option>
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
      <input
        type="number"
        name="year"
        value={book.year}
        onChange={handleChange}
        placeholder="Año"
      />
      <input
        type="number"
        name="pages"
        value={book.pages}
        onChange={handleChange}
        placeholder="Páginas"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
      />
      {imagePreview && <img src={imagePreview} alt="Vista previa de la imagen" className="image-preview" />}
      <button className="update-book-button" type="submit">Actualizar libro</button>
    </form>
  );
};

export default UpdateBookForm;
