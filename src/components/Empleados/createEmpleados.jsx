
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CrearEmpleado = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'garçom',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al crear empleado');

      toast.success(data.message);  // Notificación de éxito
      setForm({ name: '', email: '', password: '', role: 'mozo' });
    } catch (err) {
      toast.error(err.message);  // Notificación de error
    }
  };

  return (
    <>
      <br />
      <h4 className="poppins-regular">Crear Nuevo Empleado</h4>

      <section className="ui-form-container">
        <form onSubmit={handleSubmit} className="ui-form">
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={form.name}
            onChange={handleChange}
            required
            className="ui-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            required
            className="ui-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="ui-input"
          />
          <select className="ui-select" name="role" value={form.role} onChange={handleChange}>
            <option className="ui-option" value="garçom">Garçom</option>
            <option className="ui-option" value="cozinha">Cozinha</option>
          </select>
          <button style={{padding:"10px"}} type="submit">Crear</button>
        </form>
      </section>
    </>
  );
};

export default CrearEmpleado;
