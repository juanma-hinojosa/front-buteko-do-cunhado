import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/pages/login.css"

import logo from "/images/logo.jpg"
import leftImg from "/images/background-login.jpg";

import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Mostrar el toast de "Cargando..."
    toast.info("Fazendo Login", {
      autoClose: false, // No se cierra automáticamente
      closeOnClick: false, // No se cierra al hacer click
      draggable: false, // No es arrastrable
    });

    try {
      const res = await fetch( `${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Error ao fazer Login");
        toast.dismiss(); // Cerrar el toast de cargando
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");

      toast.dismiss(); // Cerrar el toast de cargando
    } catch (err) {
      console.error(err);
      setError("Error no servidor");
      toast.dismiss(); // Cerrar el toast de cargando
    }
  };
  return (
    <div className="admin-login-wrapper_765584">
      {/* Columna izquierda */}
      <div className="admin-login-image_765584">
        <img src={leftImg} alt="Consultorio dental" />
      </div>

      {/* Columna derecha */}
      <div className="admin-login-container_765584">
        <img src={logo} alt="Logo" className="admin-login-logo_765584" />
        <div>
          <h2 className="admin-login-title_765584">Faça seu login</h2>

          <p className="admin-login-subtext_765584">
            Bem-vindo ao painel de administração do restaurante.<br />
            Por favor faça login
          </p>
        </div>


        <form onSubmit={handleLogin} className="admin-login-form_765584">
          <label htmlFor="email">Insira seu email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="admin-login-input_765584"
            required
          />
          <label htmlFor="password">Insira sua Senha</label>
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-login-input_765584"
            required
          />
          <button type="submit" className="admin-login-button_765584">
            Conecte-se
          </button>
          {error && <p className="admin-login-error_765584">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
