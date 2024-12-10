import React from "react";
import Home from "../components/Home";
import Contact from "../components/Contact";
import { Route, Routes } from "react-router-dom";
import RuletaRusa from "../components/projects/RuletaRusa";
import KeyGenerator from "../components/projects/KeyGenerator";
import GetUsers from "../components/projects/GetUsers";
import TodoList from "../components/projects/TodoList";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="ruletaRusa" element={<RuletaRusa />} />
        <Route path="keygenerator" element={<KeyGenerator />} />
        <Route path="getusers" element={<GetUsers />} />
        <Route path="todolist" element={<TodoList />} />
        <Route path="/*" element={<h1>Error 404</h1>} />
      </Routes>
    </>
  );
};

export default AppRouter;
