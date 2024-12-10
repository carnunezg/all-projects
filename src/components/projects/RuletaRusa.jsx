import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/RuletaRusa.css';

const RuletaRusa = () => {
  const [mensaje, setMensaje] = useState('Haz clic en el gatillo para probar tu suerte');
  const [isPlaying, setIsPlaying] = useState(true);//para deshabilitar el boton gatillo
  const [color, setColor] = useState('#2196f3');
  const [loading, setLoading] = useState(false); // Cambiar a booleano
  const bulletChamber = Math.floor(Math.random() * 6) + 1; // Bala en la cámara

  // Hacer clic
  const handleClick = () => {
    if (!isPlaying) return; //para deshabilitar el boton gatillo

    setLoading(true); // Iniciar el estado de carga
    const currentChamber = Math.floor(Math.random() * 6) + 1; // Cámara actual

    // Simular un retraso de carga
    setTimeout(() => {
      if (currentChamber === bulletChamber) {
        setMensaje(`¡Perdiste! La bala estaba en la cámara "${currentChamber}"`);
        setIsPlaying(false);
        setColor('red');
      } else {
        setMensaje(`¡Sobreviviste! La cámara "${currentChamber}" está vacía.`);
        setColor('rgb(85, 224, 85)');
      }
      setLoading(false); // Finalizar el estado de carga
    }, 1000); // Simulación de 1 segundos de retraso
  };

  const resetGame = () => {
    setMensaje('Haz clic en el gatillo para probar tu suerte');
    setColor('#2196f3');
    setIsPlaying(true); //para deshabilitar el boton gatillo
    setLoading(false); // Asegurarse de que el spinner esté oculto al reiniciar
  };

  return (
    <>
    <div className='container-ruleta-main' >
    <h1 className='h1-ruleta'>Ruleta Rusa</h1>
      <div className='container-ruleta'>

        <p className='p-ruleta' style={{ color: loading ? '#2196f3' : color, fontSize: mensaje.includes('¡Perdiste!') ? '20px' : '20px' }}>
          {loading ? (
            <div>
              <span className='spinner-border spinner-border-sm' 
              role='status' 
              aria-hidden='true'
              ></span>
              Cargando...
            </div>
          ) : (
            mensaje
          )}
        </p>
        <div className='container-ruleta-btn'>
          <button
            className='gatillo-btn'
            onClick={handleClick}
            disabled={loading || !isPlaying} // Deshabilitar el botón cuando está cargando
          >
            Gatillo
          </button>
          <button
            className='reiniciar-btn'
            onClick={resetGame}
            style={{ marginLeft: '10px' }}
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
    <div>
    <Link to="/" className="volver-btn">Volver</Link>
    </div>
    </>
  );
};

export default RuletaRusa;