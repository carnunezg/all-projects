import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/GetUsers.css";

const GetUsers = () => {
  const [getUsers, setGetUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = "https://rickandmortyapi.com/api/character/";
    const res = await fetch(url);
    const data = await res.json();

    const users = data.results.map((user) => ({
      id: user.id,
      name: user.name,
      image: user.image,
    }));

    setGetUsers(users);
    setFilteredUsers(users); // Inicialmente mostramos todos los usuarios
    setIsEmpty(false);
    setSearchString("");
  };

  const searchUser = (e) => {
    const searchValue = e.target.value;
    setSearchString(searchValue);

    if (searchValue === "") {
      setFilteredUsers(getUsers); // Mostrar todos los usuarios si el campo está vacío
    } else {
      const searchResults = getUsers.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredUsers(searchResults);
      setIsEmpty(searchResults.length === 0);
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = filteredUsers.filter((user) => user.id !== userId);
    setFilteredUsers(updatedUsers);
    setIsEmpty(updatedUsers.length === 0);

    // También actualizamos `getUsers` para reflejar los cambios de eliminación
    setGetUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const styles = {
    display: "grid",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  };

  const stylesBtn = {
    display: "flex",
    width: "50%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    columnGap: "7rem",
  };

  const stylesInput = {
    display: "flex",
    width: "500",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "7rem",
    textAlign: "left",
    fontSize: "18px",
    padding: "20px",
    borderRadius: "20px",
  };

  // const linea = {
  //     border: '6px',
  //     solid: 'black',
  //     width: '80%',
  //     margin: '20px',
  // }

  return (
    <>
      <main className="container-user-main">
        <h1 className="h1-titulo">Get Users <br/><span>Rick Morty</span></h1>
        <div style={stylesInput}>
          <input
            type="text"
            placeholder="Buscar..."
            onChange={searchUser}
            value={searchString}
            className="input-search"
          />
        </div>
        <section className="container-user-section">
          {isEmpty ? (
            <div style={styles}>
              <h2>Sin Resultados.</h2>
              <hr />
              <button className="btn-recargar" onClick={getData}>
                Recargar
              </button>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <section className="container-list-main">
                <div className="container-list" key={user.id}>
                  <img src={user.image} alt={user.name} />
                  <p>{user.name}</p>

                  <button
                    className="btn-delete"
                    onClick={() => deleteUser(user.id)}
                  >
                    Eliminar
                  </button>

                </div>
              </section>
            ))
          )}
        </section>
      </main>

      <Link to="/" className="volver-btn">
        Volver
      </Link>
    </>
  );
};

export default GetUsers;
