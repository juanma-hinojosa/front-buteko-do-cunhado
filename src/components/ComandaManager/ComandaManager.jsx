// src/components/ComandaManager/ComandaManager.jsx
import React, { useEffect, useState } from 'react';
// import ComandaForm from './ComandaForm';
import ListaComandas from './ListaComandas';
import CrearComanda from './ComandaForm';
import AdminCaja from './AdminCaja';
// import './ComandaManager.css';
import io from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";


const socket = io(`${import.meta.env.VITE_API_URL}`); // Ajustá según tu dominio si estás en producción


const ComandaManager = () => {
  const [nuevaComanda, setNuevaComanda] = useState(null);
  const [user, setUser] = useState(null);
  const [vista, setVista] = useState("listar")
  const [cajaAbierta, setCajaAbierta] = useState(false);

  const handleNuevaComanda = (comanda) => {
    setNuevaComanda(comanda);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

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



    verificarCaja();
    // Escuchar evento en tiempo real
    socket.on("cajaActualizada", (data) => {
      setCajaAbierta(data.abierta);
    });

    return () => {
      socket.off("cajaActualizada");
    };
  }, []);

  return (
    <>
      <div className="comanda-manager-container">
        {user?.role === "admin" && (
          <AdminCaja />
        )}

        <br />

        <div className="btn-group poppins-regular"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            // padding: "2rem"
          }}
        >
          <button onClick={() => setVista("crear")}>Criar Comanda</button>
          <button onClick={() => setVista("listar")}>Listar Comandas abertas</button>
        </div>
        <br />
        <hr />

        <h3 style={{ color: cajaAbierta ? "green" : "red" }}>
          {cajaAbierta
            ? "O caixa está aberta. Pode criar comandas."
            : "O caixa está fechada."}
        </h3>

        <br />


        {vista === "crear" && <CrearComanda onNuevaComanda={handleNuevaComanda} />}
        {vista === "listar" && <ListaComandas nuevaComanda={nuevaComanda} />}

      </div>
    </>

  );
};

export default ComandaManager;
