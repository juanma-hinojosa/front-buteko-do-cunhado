// Componente que permite agregar un nuevo producto a una comanda
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AgregarItemComanda = ({ comandaId }) => {
  const [menu, setMenu] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState("");
  const [observacion, setObservacion] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/menu/disponibles`)
      .then(res => setMenu(res.data))
      .catch(() => toast.error("Error al cargar menú"));
  }, []);

  const categorias = [...new Set(menu.map(p => p.categoria))];

  const handleAgregar = async () => {
    if (!producto) return toast.error("Selecciona un producto");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/comandas/${comandaId}/agregar-item`,
        { producto, observacion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Producto agregado");
      setCategoria("");
      setProducto("");
      setProductos([]);
      setObservacion("");
    } catch {
      toast.error("Error al agregar producto");
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h5>Vai adicionar mais alguma coisa?</h5>
      <select value={categoria} onChange={e => {
        setCategoria(e.target.value);
        setProductos(menu.filter(p => p.categoria === e.target.value));
        setProducto("");
      }}>
        <option value="">Categoría</option>
        {categorias.map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <select value={producto} onChange={e => setProducto(e.target.value)}>
        <option value="">Produto</option>
        {productos.map(p => (
          <option key={p._id} value={p._id}>
            {p.nombre} - R${p.valor}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Comentario"
        value={observacion}
        onChange={e => setObservacion(e.target.value)}
      />
      <button onClick={handleAgregar}>Agregar</button>
    </div>
  );
};

export default AgregarItemComanda;
