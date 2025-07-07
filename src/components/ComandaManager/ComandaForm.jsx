import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";

const socket = io("https://back-buteko-do-cunhado.onrender.com"); // Ajustá según tu dominio si estás en producción

const CrearComanda = () => {
  const [cajaAbierta, setCajaAbierta] = useState(false);

  const [form, setForm] = useState({
    nombreCliente: "",
    numeroMesa: "",
    items: [],
  });

  const [categorias, setCategorias] = useState([]);
  const [menuDisponible, setMenuDisponible] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const [nuevoItem, setNuevoItem] = useState({
    categoria: "",
    producto: "",
    observacion: "",
  });

  useEffect(() => {
    // Funcion nueva
    const verificarCaja = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/caja/actual`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCajaAbierta(!!res.data);
      } catch {
        toast.error("Error al verificar estado de caja");
      }
    };
    // Fin de la funcion nueva

    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu/disponibles`);
        setMenuDisponible(res.data);
        const categoriasUnicas = [...new Set(res.data.map((item) => item.categoria))];
        setCategorias(categoriasUnicas);
      } catch (error) {
        toast.error("Error al obtener menú disponible");
      }
    };
    fetchMenu();
    verificarCaja();

    // Escuchar evento en tiempo real
    socket.on("cajaActualizada", (data) => {
      setCajaAbierta(data.abierta);
    });

    return () => {
      socket.off("cajaActualizada");
    };
  }, []);

  const handleCategoriaChange = (categoriaSeleccionada) => {
    setNuevoItem({ ...nuevoItem, categoria: categoriaSeleccionada, producto: "" });
    const filtrados = menuDisponible.filter(item => item.categoria === categoriaSeleccionada);
    setProductosFiltrados(filtrados);
  };

  const handleAddItem = () => {
    if (!nuevoItem.producto) {
      return toast.error("Selecciona un producto antes de agregar");
    }
    setForm((prevForm) => ({
      ...prevForm,
      items: [
        ...prevForm.items,
        {
          producto: nuevoItem.producto,
          observacion: nuevoItem.observacion,
        },
      ],
    }));

    // Resetear campos de item
    setNuevoItem({
      categoria: "",
      producto: "",
      observacion: "",
    });
    setProductosFiltrados([]);
  };

  const handleRemoveItem = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      items: prevForm.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.items.length === 0) return toast.error("Agrega al menos un producto");
    if (!cajaAbierta) return toast.error("La caja está cerrada. No puedes crear comandas.");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comandas`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Comanda creada");
      setForm({ nombreCliente: "", numeroMesa: "", items: [] });
      setNuevoItem({ categoria: "", producto: "", observacion: "" });
      setProductosFiltrados([]);
    } catch (error) {
      toast.error("Error al crear comanda");
    }
  };

  return (
    <>
      {/* {!cajaAbierta && <p style={{ color: "red" }}>La caja está cerrada. No se pueden crear comandas.</p>} */}

      <h3 style={{ color: cajaAbierta ? "green" : "red" }}>
        {cajaAbierta
          ? "A caixa está aberta. Pode criar comandas."
          : "A caixa está fechada."}
      </h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <h3>Criar nova comanda</h3>

        <input
          type="text"
          placeholder="Nombre del cliente"
          value={form.nombreCliente}
          onChange={(e) => setForm({ ...form, nombreCliente: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Número de mesa"
          value={form.numeroMesa}
          onChange={(e) => setForm({ ...form, numeroMesa: e.target.value })}
          required
        />

        <select
          value={nuevoItem.categoria}
          onChange={(e) => handleCategoriaChange(e.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={nuevoItem.producto}
          onChange={(e) => setNuevoItem({ ...nuevoItem, producto: e.target.value })}
        >
          <option value="">Seleccionar producto</option>
          {productosFiltrados.map((item) => (
            <option key={item._id} value={item._id}>
              {item.nombre} - R${item.valor}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Observación (opcional)"
          value={nuevoItem.observacion}
          onChange={(e) => setNuevoItem({ ...nuevoItem, observacion: e.target.value })}
        />

        <button type="button" onClick={handleAddItem}>
          Agregar producto
        </button>

        <ul>
          {form.items.map((item, index) => {
            const producto = menuDisponible.find(p => p._id === item.producto);
            return (
              <li key={index}>
                {producto?.nombre || 'Producto'} - Obs: {item.observacion || 'Ninguna'}
                <button type="button" onClick={() => handleRemoveItem(index)}>Quitar</button>
              </li>
            );
          })}
        </ul>

        <button type="submit">Crear comanda</button>
      </form>
    </>

  );
};

export default CrearComanda;
