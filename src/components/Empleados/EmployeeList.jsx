

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Empleados.css";

const ListadoEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({ name: "", email: "", role: "", password: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast.error("No autorizado. Solo el administrador puede ver esta sección.");
        return;
      }

      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      toast.error("Error al obtener la lista de empleados.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este empleado?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEmpleados();
      toast.success("Empleado eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      toast.error("Error al eliminar el empleado.");
    }
  };

  const handleEdit = (user) => {
    setEditandoId(user._id);
    setFormEdit({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "", // vacía por seguridad
    });
  };

  const handleChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formEdit),
      });
      setEditandoId(null);
      setFormEdit({ name: "", email: "", role: "", password: "" });
      fetchEmpleados();
      toast.success("Empleado actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      toast.error("Error al actualizar el empleado.");
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormEdit({ name: "", email: "", role: "", password: "" });
  };

  return (
    <div className="empleados">
      <h2 className="empleados__titulo poppins-light">Listado de Empleados</h2>
      <div className="empleados__tabla-contenedor">
        <table className="empleados__tabla">
          <thead>
            <tr className="poppins-regular">
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Nueva Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((user) => (
              <tr key={user._id}>
                <td className="poppins-light">
                  {editandoId === user._id ? (
                    <input type="text" name="name" value={formEdit.name} onChange={handleChange} className="empleados__input" />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="poppins-light">
                  {editandoId === user._id ? (
                    <input type="email" name="email" value={formEdit.email} onChange={handleChange} className="empleados__input" />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="poppins-light">
                  {editandoId === user._id ? (
                    <select name="role" value={formEdit.role} onChange={handleChange} className="empleados__select">
                      <option value="admin">Admin</option>
                      <option value="garçom">Garçom</option>
                      <option value="cozinha">Cozinha</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="poppins-light">
                  {editandoId === user._id ? (
                    <input
                      type="password"
                      name="password"
                      placeholder="(Opcional)"
                      value={formEdit.password}
                      onChange={handleChange}
                      className="empleados__input"
                    />
                  ) : (
                    "••••••••"
                  )}
                </td>
                <td className="empleados__acciones">
                  {editandoId === user._id ? (
                    <>
                      <button className="empleados__btn empleados__btn--guardar" onClick={() => handleUpdate(user._id)}>Guardar</button>
                      <button className="empleados__btn empleados__btn--cancelar" onClick={cancelarEdicion}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="empleados__btn empleados__btn--editar" onClick={() => handleEdit(user)}>Editar</button>
                      <button className="empleados__btn empleados__btn--eliminar" onClick={() => handleDelete(user._id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListadoEmpleados;
