import React from "react";
import logoStake from "/images/stake.webp"
const Footer = () => {
    const year = new Date().getFullYear();

    return (
         <footer
      style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {/* Columna 1: Nombre del restaurante + año */}
        <div style={{ flex: '1 1 300px', marginBottom: '15px' }}>
          <h3 style={{ margin: 0 }}>Boteko Do Cunhado</h3>
          <p style={{ margin: '5px 0 0 0' }}>© {year} Todos os direitos reservados.</p>
        </div>

        {/* Columna 2: Empresa desarrolladora + logo */}
        <div
          style={{
            flex: '1 1 300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <p style={{ margin: 0, marginRight: '10px' }}>Site Desenvoldido por
            <a style={{ margin: 0, marginLeft: '10px', color:"white" }} href="https://stakedev.net/" target="_blank" rel="noopener noreferrer">
             Stake Dev
            </a>

          </p>
          <img
            src={logoStake}
            alt="Stake Dev Logo"
            style={{ height: '30px' }}
          />
        </div>
      </div>
    </footer>
    );
};

export default Footer;
