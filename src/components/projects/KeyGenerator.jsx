import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/KeyGenerator.css";

const KeyGenerator = () => {
  const [clave, setClave] = useState("");
  const [valor, setValor] = useState("");
  const [textBoton, setTextBoton] = useState("Generar");
  const [textError, setTextError] = useState("");

  const nuevoValor = (evento) => {
    setValor(evento.target.value); // Actualizar el estado con el valor del input
  };

  let caracteres =
    "**..ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890**..";
  let arrayCaracteres = caracteres.split("");

  const claveLetras = (longitud) => {
    let newLetras = "";
    for (let i = 0; i < longitud; i++) {
      let letraAleatoria = Math.floor(Math.random() * arrayCaracteres.length);
      newLetras = newLetras + arrayCaracteres[letraAleatoria];
    }
    return newLetras;
  };

  const generarOtro = () => {
    const cantCaracter = parseInt(valor, 10);
    if (cantCaracter > 0) {
      const claveGenerada = claveLetras(cantCaracter);
      setClave(claveGenerada);
      setTextBoton("Generar otro");
      setTextError("");
    } else {
      setTextError("Por favor, ingresa una cantidad válida de caracteres.");
      setTimeout(() => {
        setTextError("");
      }, 3000);
    }
  };

  const limpiarCampos = () => {
    setClave("");
    setValor("");
    setTextBoton("Generar");
    setTextError("");
  };

  return (
    <>
      <div className="container-generator-main">
        <h1 className="titulo">GENERADOR DE CLAVES</h1>
        <div className="container-generator">
          <div className="d-flex justify-content-center m-2">
            <input
              className="input-generator"
              type="number"
              placeholder="Cantidad de caracteres..."
              min={0}
              max={50}
              style={{ textAlign: "center" }}
              value={valor}
              onChange={nuevoValor}
            ></input>
          </div>
          <div className="container-mensaje">
            <p className="p-mensaje" onChange={generarOtro}>
              {textError}
            </p>
          </div>
          <div>
            <h2 className="text-contrasena">Contraseña</h2>
            <label className="label-contrasena">
              {clave ? clave : "____________"}
            </label>
          </div>

          <div className="container-generator-btn">
            <button className="generar-btn" onClick={generarOtro}>
              {textBoton}
            </button>

            <button className="limpiar-btn" onClick={limpiarCampos}>
              Limpiar
            </button>
          </div>
        </div>
      </div>
      <Link to="/" className="volver-btn">
        Volver
      </Link>
    </>
  );
};

export default KeyGenerator;
