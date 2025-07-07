// src/components/ComandaManager/ComandaManager.jsx
import React, { useEffect, useState } from 'react';
// import ComandaForm from './ComandaForm';
import ListaComandas from './ListaComandas';
import CrearComanda from './ComandaForm';
import AdminCaja from './AdminCaja';
// import './ComandaManager.css';

const ComandaManager = () => {
  const [nuevaComanda, setNuevaComanda] = useState(null);
  const [user, setUser] = useState(null);
  const handleNuevaComanda = (comanda) => {
    setNuevaComanda(comanda);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="comanda-manager-container">
      {user?.role === "admin" && (
        <AdminCaja />
      )}
      <CrearComanda onNuevaComanda={handleNuevaComanda} />
      <ListaComandas nuevaComanda={nuevaComanda} />
    </div>
  );
};

export default ComandaManager;
