import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../socket";
import AgregarItemComanda from "./AgregarItemComanda";

import Modal from 'react-modal';

Modal.setAppElement('#root'); // Esto es necesario para accesibilidad


const ESTADOS = ["pendiente", "retirar", "entregado", "cerrado"];

const ComandaList = () => {
  const [comandas, setComandas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("pendiente");
  const [metodosPagoPorComanda, setMetodosPagoPorComanda] = useState({});

  const [comandaSeleccionada, setComandaSeleccionada] = useState(null);


  useEffect(() => {
    const cargar = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comandas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComandas(res.data);
    };

    cargar();

    socket.on("nueva-comanda", (c) => {
      setComandas((prev) => [c, ...prev]);
    });

    socket.on("comanda-actualizada", (c) => {
      setComandas((prev) =>
        prev.map((x) => (x._id === c._id ? c : x))
      );
    });

    return () => {
      socket.off("nueva-comanda");
      socket.off("comanda-actualizada");
    };
  }, []);



  const comandasFiltradas = comandas.filter(
    (c) => c.estado === estadoFiltro
  );


  const cambiarEstado = async (id, nuevoEstado) => {
    const token = localStorage.getItem("token");
    let payload = { nuevoEstado };

    if (nuevoEstado === "cerrado") {
      const metodo = metodosPagoPorComanda[id];

      if (!metodo) {
        return alert("Debe seleccionar un método de pago antes de cerrar la comanda.");
      }

      payload.metodoPago = metodo;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/comandas/${id}/cambiar-estado`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      alert(err.response?.data?.error || "Error al cambiar estado");
    }
  };



  return (
    <div className="lista-comandas">
      <h2>Comandas em tempo real</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1rem",
      }}>
        {ESTADOS.map((estado) => (
          <button
            key={estado}
            onClick={() => setEstadoFiltro(estado)}
            style={{
              marginRight: "10px",
              padding: "6px 12px",
              backgroundColor: estado === estadoFiltro ? "#222" : "#ccc",
              color: estado === estadoFiltro ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {estado.toUpperCase()}
          </button>
        ))}
      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          padding: "16px",
        }}
      >
        {comandasFiltradas.length === 0 ? (
          <p style={{ textTransform: "uppercase" }} >Não há comandas em "{estadoFiltro}"</p>
        ) : (
          comandasFiltradas.map((c) => (
            <div key={c._id} className="comanda-card" style={{ border: "1px solid white", padding: "10px" }}>
              <header>
                <strong>Mesa {c.numeroMesa}</strong> – {c.nombreCliente}
              </header>
              <small>Estado: {c.estado}</small>
              <ul>
                {c.items.map((it, i) => (


                  <li key={i} style={{ textTransform: "capitalize" }}>
                    {it.producto?.nombre || "Eliminado"} – {it.observacion || "Sem obs"} –
                    <strong> R$ {it.producto?.valor?.toFixed(2) || "0.00"}</strong>
                    {it.nuevo && <span style={{ color: "red", marginLeft: "6px" }}>🆕</span>}
                  </li>
                ))}
              </ul>

              <p>
                <strong>Total: R$ {
                  c.items.reduce((acc, it) => acc + (it.producto?.valor || 0), 0).toFixed(2)
                }</strong>
              </p>


              {/* <h5>Vai adicionar mais alguma coisa?</h5> */}

              {/* {c.estado !== "cerrado" && <AgregarItemComanda comandaId={c._id} />} */}

              {c.estado !== "cerrado" && (
                <>
                  <h5>Vai adicionar mais alguma coisa?</h5>
                  <button
                    onClick={() => setComandaSeleccionada(c._id)}
                  >
                    Adicionar item
                  </button>
                </>

              )}

              <br />
              <br />


              {c.estado !== "cerrado" && (
                <div className="botones-estado"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "1rem",
                    // padding: "2rem"
                  }}
                >
                  {/* estados por lo que pasa la comanda  */}
                  {ESTADOS.filter((e) => e !== c.estado).map((e) => (
                    <button
                      key={e}
                      onClick={() => cambiarEstado(c._id, e)}
                      style={{
                        border: "1px solid #aaa",
                        marginRight: "10px",
                        padding: "6px 12px",
                        // backgroundColor: "#333",
                        color: "white",
                        // border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Marcar como {e}
                    </button>
                  ))}
                </div>
              )}



              {/* Estados de metodo de pago visible entregado para cerrado*/}
              {c.estado !== "cerrado" && c.estado !== "pendiente" && c.estado !== "retirar" && (
                <div style={{ marginTop: "10px" }}>
                  <label htmlFor={`metodo-${c._id}`}>Método de pagamento:</label>
                  <select
                    id={`metodo-${c._id}`}
                    value={metodosPagoPorComanda[c._id] || ""}
                    onChange={(e) =>
                      setMetodosPagoPorComanda({
                        ...metodosPagoPorComanda,
                        [c._id]: e.target.value,
                      })
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    <option value="">Escolha o metodo de pagamento</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="pix">Pix</option>
                    <option value="cartão de crédito">Cartão de Crédito</option>
                    <option value="cartão de débito">Cartão de Débito</option>
                  </select>
                </div>
              )}

            </div>
          ))
        )}
      </div>



      <Modal
        isOpen={!!comandaSeleccionada}
        onRequestClose={() => setComandaSeleccionada(null)}
        contentLabel="Agregar Item"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            padding: '20px',
            backgroundColor: "#211f1f"
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Adicionar item</h3>
          <button
            onClick={() => setComandaSeleccionada(null)}
            style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}
          >
            ❌
          </button>
        </div>

        {comandaSeleccionada && (
          <AgregarItemComanda
            comandaId={comandaSeleccionada}
            onClose={() => setComandaSeleccionada(null)}
          />
        )}
      </Modal>


    </div>
  );
};

export default ComandaList;
