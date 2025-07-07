import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CajaControl = () => {
  const [cajaAbierta, setCajaAbierta] = useState(null);
  const token = localStorage.getItem('token');

  const fetchCajaActual = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/caja/actual`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCajaAbierta(res.data);
    } catch (error) {
      toast.error('Error al obtener el estado de la caja');
    }
  };

  const abrirCaja = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/caja/abrir`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Caja abierta correctamente');
      setCajaAbierta(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al abrir caja');
    }
  };

  const cerrarCaja = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/caja/cerrar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Caja cerrada correctamente');
      setCajaAbierta(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al cerrar caja');
    }
  };

  useEffect(() => {
    fetchCajaActual();
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <h2>Control de Caja</h2>
      {cajaAbierta ? (
        <div>
          <p>Caja abierta desde: {new Date(cajaAbierta.abiertaEn).toLocaleString()}</p>
          <button onClick={cerrarCaja}>Cerrar Caja</button>
        </div>
      ) : (
        <button onClick={abrirCaja}>Abrir Caja</button>
      )}
    </div>
  );
};

export default CajaControl;
