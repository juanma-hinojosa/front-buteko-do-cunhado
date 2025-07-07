import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FlyerManager.css";

const FlyerManager = () => {
  const [flyers, setFlyers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    paragraph: "",
    expirationDate: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [view, setView] = useState("list"); // "create" o "list"

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFlyers();
  }, []);

  const fetchFlyers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/flyers`, {
        credentials: 'include',
      });
      const data = await res.json(); // ✅ convertir respuesta a JSON
      setFlyers(data);
      // setFlyers(res.data);
    } catch (err) {
      toast.error("Error al obtener flyers");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("paragraph", formData.paragraph);
    data.append("expirationDate", formData.expirationDate);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingId) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/flyers/${editingId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },

          credentials: 'include',
          body: data, // NO establecer Content-Type manualmente
        });
        toast.success("Flyer actualizado");
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/flyers`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },

          credentials: 'include', // Para incluir cookies
          body: data, // NO establecer Content-Type manualmente, el navegador lo hará con el boundary correcto
        });

        // await axios.post("https://backend-cios.onrender.com/api/flyers", data, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        toast.success("Flyer creado");
      }
      setFormData({ title: "", paragraph: "", expirationDate: "", image: null });
      setPreviewImage("");
      setEditingId(null);
      fetchFlyers();
    } catch (err) {
      toast.error("Error al guardar flyer");
    }
  };

  const handleEdit = (flyer) => {
    setEditingId(flyer._id);
    setFormData({
      title: flyer.title,
      paragraph: flyer.paragraph,
      expirationDate: flyer.expirationDate.slice(0, 10),
      image: null,
    });
    setPreviewImage(flyer.image);
    setView("create");
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este flyer?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/flyers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Flyer eliminado");
      fetchFlyers();
    } catch (err) {
      toast.error("Error al eliminar flyer");
    }
  };

  const formatDateLocal = (isoDate) => {
    // isoDate: "2025-06-15T00:00:00.000Z" o similar
    const [year, month, day] = isoDate.split("T")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flyer-manager-container">
      <h2 className="poppins-semibold">Gestión de Flyers</h2>

      <div className="flyer-manager-buttons">
        <button style={{ padding: "5px", marginRight: "10px" }} onClick={() => setView("create")}>
          {editingId ? "Editar Flyer" : "Crear Nuevo Flyer"}
        </button>
        <button style={{ padding: "5px", marginRight: "10px" }} onClick={() => setView("list")}>Listar Flyers</button>
      </div>
      <br />
      <hr />
      {view === "create" && (
        <>
          <form className="flyer-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="paragraph"
              placeholder="Texto"
              value={formData.paragraph}
              onChange={handleInputChange}
              required
            ></textarea>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                className="flyer-preview-img"
              />
            )}
            <button type="submit" className="flyer-submit-btn">
              {editingId ? "Actualizar Flyer" : "Crear Flyer"}
            </button>
          </form>
        </>
      )}

      {view === "list" && (
        <>
          <h3 className="poppins-regular">Flyers Activos</h3>
          <div className="flyers-list">
            {flyers.map((flyer) => (
              <div key={flyer._id} className="flyer-card">
                <img src={flyer.image} alt={flyer.title} className="flyer-img" />
                <h4>- {flyer.title}</h4>
                <p><strong >Descripcion</strong>: {flyer.paragraph}</p>
                <p>
                  <strong>Expira:</strong>{" "}
                  {/* {new Date(flyer.expirationDate).toLocaleDateString()} */}
                  {/* {flyer.expirationDate.split("T")[0]} */}
                  {formatDateLocal(flyer.expirationDate)}
                </p>
                <div className="flyer-card-buttons">
                  <button onClick={() => handleEdit(flyer)}>Editar</button>
                  <button onClick={() => handleDelete(flyer._id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FlyerManager;
