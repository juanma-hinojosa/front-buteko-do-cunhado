// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const CajaControl = () => {
//   const [cajaAbierta, setCajaAbierta] = useState(null);
//   const token = localStorage.getItem('token');

//   const fetchCajaActual = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/caja/actual`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setCajaAbierta(res.data);
//     } catch (error) {
//       toast.error('Error ao obter o status do caixa');
//     }
//   };

//   const abrirCaja = async () => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/caja/abrir`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       toast.success('Caja abierta correctamente');
//       setCajaAbierta(res.data);
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Error ao abrir o caixa');
//     }
//   };

//   const cerrarCaja = async () => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/caja/cerrar`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       toast.success('Caixa fechada com sucesso');
//       setCajaAbierta(null);
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Error ao fechar o caixa');
//     }
//   };

//   useEffect(() => {
//     fetchCajaActual();
//   }, []);

//   return (
//     <div style={{ margin: '20px 0' }}>
//       <h2>Controle de Caixa</h2>
//       {cajaAbierta ? (
//         <div>
//           <p>Caixa aberta desde: {new Date(cajaAbierta.abiertaEn).toLocaleString()}</p>
//           <button onClick={cerrarCaja}>Fechar o Caixa</button>
//         </div>
//       ) : (
//         <button onClick={abrirCaja}>Abrir o caixa</button>
//       )}
//     </div>
//   );
// };

// export default CajaControl;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './CajaControl.css'; // 👈 Asegúrate de crear/importar este archivo

const CajaControl = () => {
  const [cajaAbierta, setCajaAbierta] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchCajaActual = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/caja/actual`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCajaAbierta(res.data);
    } catch (error) {
      toast.error('Error ao obter o status do caixa');
    }
  };

  const abrirCaja = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/caja/abrir`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Caja aberta com sucesso');
      setCajaAbierta(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erro ao abrir o caixa');
    } finally {
      setLoading(false);
    }
  };

  const cerrarCaja = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/caja/cerrar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Caixa fechada com sucesso');
      setCajaAbierta(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erro ao fechar o caixa');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCajaActual();
  }, []);

  return (
    <div className="caja-container">
      <h2>Controle de Caixa</h2>
      {cajaAbierta ? (
        <div>
          <p>Caixa aberta desde: {new Date(cajaAbierta.abiertaEn).toLocaleString()}</p>
          <button onClick={cerrarCaja} disabled={loading} className="btn-caja">
            {loading ? <span className="spinner"></span> : 'Fechar o Caixa'}
          </button>
        </div>
      ) : (
        <button onClick={abrirCaja} disabled={loading} className="btn-caja">
          {loading ? <span className="spinner"></span> : 'Abrir o Caixa'}
        </button>
      )}
    </div>
  );
};

export default CajaControl;
