import React, { useState } from "react";
import "./styles/Contacto.css";

const initialUser = {
  nombre: "",
  correo: "",
  resumen: "",
};

const Contacto = () => {
  const [user, setUser] = useState([initialUser]);
  const [send, setSend] = useState(false);

  const enviar = (e) => {
    e.preventDefault();
    setSend(true); // Mostrar mensaje de "Enviado"
    setUser(initialUser);

    setTimeout(() => {
      setSend(false); // Ocultar mensaje después de 2 segundos
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Contacto</h1>
      {send && (
        <div className="container-message">
          {" "}
          <p className="message">¡Enviado exitosamente!</p>
        </div>
      )}
      <div className="flex">
        <div className="container-main">
          <form className="contacto" onSubmit={enviar}>
            <div className="input-group">
              <input
                className="input"
                type="text"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                required
              />
              <label className="label">Nombre</label>
            </div>

            <div className="input-group">
              <input
                className="input"
                type="email"
                name="correo"
                value={user.correo}
                onChange={handleChange}
                required
              />
              <label className="label">Correo</label>
            </div>
            <div className="input-group">
              <textarea
                className="input"
                style={{ width: "100%", height: "200px" }}
                name="resumen"
                value={user.resumen}
                onChange={handleChange}
                required
              />
              <label className="label">Mensaje</label>
            </div>

            <div className="container-btn">
              <button className="btn" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contacto;
