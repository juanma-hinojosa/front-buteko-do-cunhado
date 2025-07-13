import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import '../css/components/navbar.css';
import LogoPng from "/images/logo.png"

const sections = [
  'Hamburguer',
  'Boca de Anjo',
  'Pastel',
  'porções',
  'Iscas',
  'Peixe',
  'Pratos',
  'Drinks',
  'Bebidas sem Alcool',
  'Cerveja',
  'Sobremesas',
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);
  const [scrolledDown, setScrolledDown] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Mostrar topbar y navbar transparente solo en Y = 0
      if (currentScroll === 0) {
        setShowTopbar(true);
        setScrolledDown(false);
      } else {
        setShowTopbar(false);
        setScrolledDown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (

    <>

      <div className={`topbar ${showTopbar ? 'show' : 'hide'}`}>
        <div className="topbar-container">
          <span><Icon icon="tabler:clock" width="24" height="24" /> Ter - Dom 11:00 a 15:00 e Sab 19:00 a 00:00. Seg - CERRADO</span>
          <div className="topbar-right">
            <span><Icon icon="tabler:phone" width="24" height="24" /> +55 19 98922-3596</span>
            {/* <span><Icon icon="uiw:mail-o" width="20" height="20" /> consultoriointegralsanmarcos@gmail.com</span> */}
            <span><Icon icon="mdi:map-marker" width="24" height="24" /> R. Leôncio Brasileiro, 294 - Jardim Santa Terezinha, Campinas - SP</span>
          </div>
        </div>
      </div>


      <nav className={`navbar ${scrolledDown ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <img src={LogoPng} alt="Logo" className="navbar-logo" />
          <div className="hamburger" onClick={() => setMenuOpen(true)}>☰</div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <div className="close-btn" onClick={closeMenu}>✕</div>
            {sections.map((item) => (
              <li key={item}>
                <a
                
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>

  );
};

export default Navbar;
