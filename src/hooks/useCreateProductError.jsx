import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCreateProductError = (res, setCreateProductOk, setRes) => {
    if (res?.status === 200) {
        console.log("Product created successfully 🎉");
        // Aquí puedes realizar acciones adicionales si la creación del producto fue exitosa
        // Por ejemplo, podrías actualizar la interfaz o realizar una redirección
        setCreateProductOk(true);
        //setRes({});

        Swal.fire({
        icon: "success",
        title: "Product created successfully 🚀",
        showConfirmButton: false,
        timer: 1500,
        });
    }  
    if (res?.status === 404) {
        // Error 404: No se ha podido guardar el elemento en la DB
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error: No se ha podido guardar el elemento en la base de datos ❌",
        showConfirmButton: false,
        timer: 1500,
        });
        //setRes({});
    }
};