import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import logo from "/images/logo.jpg"


// const METODOS_PAGO = ['dinheiro', 'pix', 'cartão de crédito', 'cartão de débito'];

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const InformeVentas = () => {
  const [comandas, setComandas] = useState([]);
  const [startDate, setStartDate] = useState(startOfDay(new Date()));
  const [endDate, setEndDate] = useState(endOfDay(new Date()));
  const [loading, setLoading] = useState(false);

  // Totales
  const [totales, setTotales] = useState({
    total: 0,
    dinheiro: 0,
    pix: 0,
    credito: 0,
    debito: 0,
  });

  // Función para cargar comandas según rango fechas
  const fetchComandas = async (start, end) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Ajusta según dónde guardes el token

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comandas/cerradas`, {
        params: {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setComandas(response.data);
      calcularTotales(response.data);
    } catch (error) {
      console.error('Error al obtener comandas', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular totales
  const calcularTotales = (comandas) => {
    let total = 0, dinheiro = 0, pix = 0, credito = 0, debito = 0;

    comandas.forEach(c => {
      // Sumar valor final de la comanda (suma de valores items)
      const valorComanda = c.items.reduce((acc, i) => acc + (i.producto.valor || 0), 0);
      total += valorComanda;

      switch (c.metodoPago) {
        case 'dinheiro': dinheiro += valorComanda; break;
        case 'pix': pix += valorComanda; break;
        case 'cartão de crédito': credito += valorComanda; break;
        case 'cartão de débito': debito += valorComanda; break;
      }
    });

    setTotales({ total, dinheiro, pix, credito, debito });
  };

  // Manejar botones últimos 7 días (Hoy, Ayer, ...)
  const handleUltimosDias = (diasAtras) => {
    const hoy = new Date();
    const start = startOfDay(subDays(hoy, diasAtras));
    const end = endOfDay(subDays(hoy, diasAtras));
    setStartDate(start);
    setEndDate(end);
    fetchComandas(start, end);
  };

  // Manejar cambio fechas input calendario
  const handleFechaInicioChange = e => {
    const fecha = new Date(e.target.value);
    setStartDate(startOfDay(fecha));
  };

  const handleFechaFinChange = e => {
    const fecha = new Date(e.target.value);
    setEndDate(endOfDay(fecha));
  };

  // Buscar con rango seleccionado
  const buscarPorRango = () => {
    fetchComandas(startDate, endDate);
  };

  const descargarPDF = async () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoSize = 30;
    const logoX = (pageWidth - logoSize) / 2;

    // 📥 Cargar logo desde public/img/logo.png
    const response = await fetch('/images/logo.jpg');
    const blob = await response.blob();

    const logoBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    // 🔳 Fondo negro y logo
    doc.setFillColor(0, 0, 0);
    doc.rect(14, 10, pageWidth - 28, 60, 'F');
    doc.addImage(logoBase64, 'JPG', logoX, 13, logoSize, logoSize);

    // 🧾 Título
    doc.setTextColor('#ff6600');
    doc.setFontSize(14);
    doc.text("Relatório de Vendas", pageWidth / 2, 53, { align: 'center' });

    const rows = comandas.map(c => {
      const fecha = new Date(c.createdAt);
      return [
        `${diasSemana[fecha.getDay()]}, ${format(fecha, 'dd/MM/yyyy')}`,
        format(fecha, 'HH:mm'),
        c.items.reduce((acc, i) => acc + (i.producto.valor || 0), 0).toFixed(2),
        c.metodoPago
      ];
    });

    autoTable(doc, {
      startY: 58,
      head: [['Día', 'Hórario', 'Total', 'Meio de Pagamento']],
      body: rows,
      style: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontSize: 10,
        halign: 'center',
      },
      headStyles: {
        fillColor: [255, 102, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [60, 60, 60],
        textColor: [255, 255, 255],
      },
      margin: { top: 10, left: 14, right: 14 },
    });

    const startY = doc.lastAutoTable?.finalY ?? 60;

    doc.setFontSize(12);
    doc.setTextColor('#ffffff');
    doc.setFillColor('#3d3d3d');
    doc.rect(14, startY + 10, 180, 35, 'F');

    doc.setTextColor('#ff6600');
    doc.text(`Total ventas: R$ ${totales.total.toFixed(2)}`, 16, startY + 17);
    doc.setTextColor('#cccccc');
    doc.text(`Dinheiro: R$ ${totales.dinheiro.toFixed(2)}`, 16, startY + 24);
    doc.text(`Pix: R$ ${totales.pix.toFixed(2)}`, 16, startY + 31);
    doc.text(`Cartão de crédito: R$ ${totales.credito.toFixed(2)}`, 90, startY + 24);
    doc.text(`Cartão de débito: R$ ${totales.debito.toFixed(2)}`, 90, startY + 31);

    doc.save(`Informe_Ventas_${format(startDate, 'yyyyMMdd')}_a_${format(endDate, 'yyyyMMdd')}.pdf`);
  };

  useEffect(() => {
    fetchComandas(startDate, endDate);
  }, []);



  return (
    <div style={{ padding: 20 }}>
      <h2>Informe de Vendas</h2>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => handleUltimosDias(0)}>Hoje</button>
        <button onClick={() => handleUltimosDias(1)}>Ontem</button>
        <button onClick={() => handleUltimosDias(2)}>2 dias atrás</button>
        <button onClick={() => handleUltimosDias(3)}>3 dias atrás</button>
        <button onClick={() => handleUltimosDias(4)}>4 dias atrás</button>
        <button onClick={() => handleUltimosDias(5)}>5 dias atrás</button>
        <button onClick={() => handleUltimosDias(6)}>6 dias atrás</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>
          Data de inicio:
          <input
            type="date"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={handleFechaInicioChange}
          />
        </label>
        <label style={{ marginLeft: 20 }}>
          Data de fim:
          <input
            type="date"
            value={format(endDate, 'yyyy-MM-dd')}
            onChange={handleFechaFinChange}
          />
        </label>
        <button onClick={buscarPorRango} style={{ marginLeft: 10 }}>Buscar</button>
      </div>

      {loading ? <p>Carregando...</p> : (
        <>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Día</th>
                <th>Hórario</th>
                <th>Total (R$)</th>
                <th>Meio de pagamento</th>
              </tr>
            </thead>
            <tbody>
              {comandas.length === 0 && (
                <tr><td colSpan="4">No há comandas neste período</td></tr>
              )}
              {comandas.map(c => {
                const fecha = new Date(c.createdAt);
                const valor = c.items.reduce((acc, i) => acc + (i.producto.valor || 0), 0);
                return (
                  <tr key={c._id}>
                    <td>{`${diasSemana[fecha.getDay()]}, ${format(fecha, 'dd/MM/yyyy')}`}</td>
                    <td>{format(fecha, 'HH:mm')}</td>
                    <td>R$ {valor.toFixed(2)}</td>
                    <td
                      style={{
                        textTransform: "capitalize"
                      }}
                    >{c.metodoPago || 'sem especificar'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ marginTop: 20 }}>
            <h3>Ingressos</h3>
            <p>Total das ventas: R$ {totales.total.toFixed(2)}</p>
            <p>Dinheiro: R$ {totales.dinheiro.toFixed(2)}</p>
            <p>Pix: R$ {totales.pix.toFixed(2)}</p>
            <p>Cartão de crédito: R$ {totales.credito.toFixed(2)}</p>
            <p>Cartão de débito: R$ {totales.debito.toFixed(2)}</p>
          </div>

          <button onClick={descargarPDF}>Baixar PDF</button>
        </>
      )}
    </div>
  );
};

export default InformeVentas;

