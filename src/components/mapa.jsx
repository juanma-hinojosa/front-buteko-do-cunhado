import { useState, useRef } from 'react';

function ResponsiveMap() {
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef(null);

  const reloadIframe = () => {
    if (iframeRef.current) {
      // Reasignamos el src para forzar la recarga
      iframeRef.current.src = iframeRef.current.src;
      setHasError(false);
    }
  };

  const handleIframeError = () => {
    setHasError(true);
  };

  return (
    <div style={{ position: 'relative', height: '50vh' }}>
      {!hasError ? (
        <iframe
          ref={iframeRef}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14694.455235431822!2d-47.11206686968097!3d-22.96444570350071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c9be0ed617cd%3A0xb38e4e66b0644dec!2sR.%20Le%C3%B4ncio%20Brasileiro%2C%20294%20-%20Jardim%20Santa%20Terezinha%2C%20Campinas%20-%20SP%2C%2013052-150%2C%20Brasil!5e0!3m2!1ses-419!2sar!4v1752372418684!5m2!1ses-419!2sar"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onError={handleIframeError}
        />
      ) : (
        <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          padding: '1rem'
        }}>
          <p>Ocurrió un error al cargar el mapa.</p>
          <button onClick={reloadIframe}>Volver a cargar</button>
        </div>
      )}
    </div>
  );
}

export default ResponsiveMap;
