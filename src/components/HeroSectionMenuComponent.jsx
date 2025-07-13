import { useEffect, useState } from "react";
import "../css/components/HeroSectionMenuComponent.css"
import Loading from "./Loading";

function HeroSectionMenuComponent(props) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/api/menu/disponibles`)
  //     .then(res => res.json())
  //     .then(data => {
  //       const filtrado = data.filter(item => item.categoria === props.categoria);
  //       setMenu(filtrado);
  //       setLoading(false);
  //       if (props.onLoaded) props.onLoaded();
  //     })
  //     .catch(err => {
  //       console.error("Error al importar el menu", err);
  //       setLoading(false);
  //       if (props.onLoaded) props.onLoaded(); // aún si hay error
  //     });
  // }, [props.categoria]);

  // console.log(`🟡 Renderizando HeroSectionMenuComponent: ${props.categoria}`);

  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/menu/disponibles`)
    .then(res => res.json())
    .then(data => {
      const filtrado = data.filter(item => item.categoria === props.categoria);
      setMenu(filtrado);
    })
    .catch(err => {
      console.error("Error al importar el menu", err);
    })
    .finally(() => {
      console.log(`✅ ${props.categoria} cargado`);
        setLoading(false);
        if (props.onLoaded) props.onLoaded(); // ← IMPORTANTE
    });
}, [props.categoria]);

  if (loading) return null;

  return (
    <section className="menu-section">
      <h1 className="menu-title">{props.title}</h1>
      <h2 className="menu-subtitle">{props.subtitle}</h2>
      <ul className="menu-list">
        {menu.map(item => (
          <li key={item._id} className="menu-item">
            <div className="menu-image-container">
              <span className="menu-price">R$ {item.valor}</span>
              <div className="menu-image-wrapper">
                <img src={item.fotoUrl} alt={item.nombre} className="menu-image" />
              </div>
            </div>
            <div className="menu-text">
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HeroSectionMenuComponent;
