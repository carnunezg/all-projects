import React from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <h1>Mis Proyectos</h1>
      <div className="container-btn-home">
        <Link to="/getusers" className="btn-home">Get Users API</Link>
        <Link to="/keygenerator" className="btn-home">
          Key Generator
        </Link>
        <Link to="/ruletaRusa" className="btn-home">
          Ruleta Rusa
        </Link>
        <Link to="/todolist" className="btn-home">To do List</Link>
      </div>
    </main>
  );
};

export default Home;
