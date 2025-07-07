import "../css/pages/DashboardPage.css"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "/images/logo.jpg"
import ItemMenuManager from "../components/ItemMenuManager";
import ComandaManager from "../components/ComandaManager/ComandaManager";
import EmpleadoManager from "../components/Empleados/EmpleadoManager";
import VentasReportPage from "../components/ventas/VentasReport";
import FlyerManager from "../components/flyer/FlyerManager";

const DashboardAdmin = () => {
  const [view, setView] = useState("menu");
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-panel-container">
      <aside className={`admin-aside ${isMenuOpen ? "open" : ""}`}>
        <button
          className="admin-close-btn"
          onClick={() => setIsMenuOpen(false)}
        >
          <Icon icon="mdi:close" />
        </button>
        <nav className="admin-nav">
          <Link to="/">
            <figure
              style={{
                width: "100px",
                height: "100px",
                margin: "20px 0"
              }}
            >
              <img style={{ width: "100%" }} src={logo} alt="logo buteko do cunhado" />
            </figure>
          </Link>

          <ul className="poppins-light">
            {/* <li onClick={() => { setView("empleados"); setIsMenuOpen(false); }}>
              <Icon icon="simple-icons:codechef" /> Empregados

            </li> */}

            {user?.role === "admin" && (
              <li onClick={() => { setView("empleados"); setIsMenuOpen(false); }}>
                <Icon icon="simple-icons:codechef" /> Empregados
              </li>
            )}

            <li onClick={() => { setView("menu"); setIsMenuOpen(false); }}>
              <Icon icon="material-symbols:menu-book-2" /> Cardapio
            </li>

            <li onClick={() => { setView("comanda"); setIsMenuOpen(false); }}>
              <Icon icon="mdi:account-group" /> Comandas
            </li>

            {user?.role === "admin" && (
              <li onClick={() => { setView("ventas"); setIsMenuOpen(false); }}>
                <Icon icon="tabler:report-money" /> Relatorio de vendas
              </li>
            )}


            {/* <li onClick={() => { setView("flyers"); setIsMenuOpen(false); }}>
              <Icon icon="lets-icons:img-out-box-fill" /> Propaganda
            </li> */}

            {user?.role === "admin" && (
              <li onClick={() => { setView("flyers"); setIsMenuOpen(false); }}>
                <Icon icon="lets-icons:img-out-box-fill" /> Propaganda
              </li>
            )}

            <li onClick={handleLogout}>
              <Icon icon="mdi:logout" /> Sair
            </li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <button
            className="admin-menu-toggle"
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon icon="mdi:menu" />
          </button>
          <h1 className="poppins-light">Painel de Administração</h1>
          {user && (
            <div className="admin-user-info poppins-regular">
              {/* <p><strong>Email:</strong> {user.email}</p> */}
              <p><strong >Rol:</strong> {user.role}</p>
              <p><strong >Usuario/a: </strong> {user.name}</p>
            </div>
          )}
        </header>

        <section className="admin-panel-content"
        // style={{
        //   backgroundImage: "url('/img/logo-white.png')",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundAttachment: "fixed",
        //   backgroundRepeat: "no-repeat",
        // }}
        >
          {view === "empleados" && <EmpleadoManager />}
          {view === "menu" && <ItemMenuManager />}
          {view === "comanda" && <ComandaManager />}
          {view === "ventas" && <VentasReportPage />}
          {view === "flyers" && <FlyerManager />}
        </section>
      </main>
    </div>
  );
};

export default DashboardAdmin;
