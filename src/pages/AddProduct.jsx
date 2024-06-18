import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useCreateProductError } from "../hooks/useCreateProductError";
import { createBook } from "../services/book.service";
import "./AddProduct.css";

export const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [okCreate, setOkCreate] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const formSubmit = async (formData) => {
        const data = new FormData();
        for (const key in formData) {
            if (formData[key] instanceof FileList) {
                data.append(key, formData[key][0]);
            } else {
                data.append(key, formData[key]);
            }
        }

        setSend(true);
        Swal.fire({
            title: 'Subiendo libro...',
            text: 'Por favor, espera mientras se sube el libro.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const createdBook = await createBook(data);
            setRes(createdBook);
            setOkCreate(true);
            Swal.fire('¡Éxito!', 'El libro se ha añadido correctamente', 'success');
        } catch (error) {
            console.error("Failed to create book:", error);
            setRes(error);
            Swal.fire('Error', 'No se pudo añadir el libro. Intenta de nuevo.', 'error');
        }
        setSend(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    useEffect(() => {
        useCreateProductError(res, setRes, setOkCreate);
    }, [res]);

    if (okCreate) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
        <form onSubmit={handleSubmit(formSubmit)}>
            <h1>Añadir libro</h1>
            <input {...register("title", { required: true })} placeholder="Título" />
            {errors.title && <p>El campo es obligatorio</p>}
            <input {...register("author")} placeholder="Autor" />
            <select {...register("genre", { required: true })} defaultValue="">
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
            {errors.genre && <p>El campo es obligatorio</p>}
            <input {...register("year")} placeholder="Año" type="number" />
            <input {...register("pages", { required: true })} placeholder="Páginas" type="number" />
            {errors.pages && <p>El campo es obligatorio</p>}
            <input {...register("image", { required: true })} type="file" onChange={handleImageChange} />
            {errors.image && <p>La imagen es obligatoria</p>}
            {imagePreview && <img src={imagePreview} alt="Vista previa de la imagen" className="image-preview" />}
            <button className="add" type="submit" disabled={send}>Añadir libro</button>
        </form>
        </>
    );
};
