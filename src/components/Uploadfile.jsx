import "./Uploadfile.css";
import { useEffect } from "react";

export const Uploadfile = () => {
  const initUpload = () => {
    const fileSelect = document.getElementById("file-upload");
    fileSelect.addEventListener("change", fileSelectHandler, false);
  };

  const fileDragHover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const fileDrag = document.getElementById("file-drag");
    fileDrag.className = e.type === "dragover" ? "hover" : "modal-body file-upload";
  };

  const fileSelectHandler = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    fileDragHover(e);
    for (let i = 0; i < files.length; i++) {
      parseFile(files[i]);
    }
  };

  const output = (msg) => {
    const messages = document.getElementById("messages");
    messages.innerHTML = msg;
  };

  const parseFile = (file) => {
    output(`<strong>${encodeURI(file.name)}</strong>`);
    const isGood = /\.(gif|jpg|png|jpeg|webp)$/i.test(file.name);
    const start = document.getElementById("start");
    const response = document.getElementById("response");
    const notImage = document.getElementById("notimage");
    const fileImage = document.getElementById("file-image");

    if (isGood) {
      start.classList.add("hidden");
      response.classList.remove("hidden");
      notImage.classList.add("hidden");
      fileImage.classList.remove("hidden");
      fileImage.src = URL.createObjectURL(file);
    } else {
      fileImage.classList.add("hidden");
      notImage.classList.remove("hidden");
      start.classList.remove("hidden");
      response.classList.add("hidden");
      document.getElementById("file-upload-form").reset();
    }
  };

  useEffect(() => {
    if (window.File && window.FileList && window.FileReader) {
      initUpload();
    } else {
      document.getElementById("file-drag").style.display = "none";
    }
  }, []);

  return (
    <div id="file-upload-form" className="uploader">
      <input id="file-upload" type="file" name="image" accept="image/*" />
      <label htmlFor="file-upload" id="file-drag">
        <img id="file-image" src="#" alt="Preview" className="hidden" />
        <div id="start">
          <i className="fa fa-download" aria-hidden="true"></i>
          <div className="divSelect">Seleccione un archivo o arrástrelo aquí</div>
          <div id="notimage" className="hidden">
            Por favor seleccione una imagen
          </div>
          <span id="file-upload-btn" className="btn btn-primary">
            Seleccione un archivo
          </span>
        </div>
        <div id="response" className="hidden">
          <div id="messages"></div>
        </div>
      </label>
    </div>
  );
};
