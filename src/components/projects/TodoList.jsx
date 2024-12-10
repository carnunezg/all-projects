import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/TodoList.css";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todoList")) || [];
    setList(savedList);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("todoList", JSON.stringify(list));
    } catch (error) {
      localStorage.removeItem("todoList");
      console.log(error);
    }
  }, [list]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addOrEditTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    if (editingId) {
      const updatedList = list.map((taskItem) =>
        taskItem.id === editingId
          ? {
              ...taskItem,
              description: task,
              time: new Date().toLocaleString(),
            }
          : taskItem
      );
      setList(updatedList);
      setMessage("Tarea Actualizada");
      setEditingId(null);
    } else {
      const newTask = {
        id: list.length + 1,
        description: task,
        done: false,
        time: new Date().toLocaleString(),
      };
      setList([newTask, ...list]);
      setMessage("Tarea Agregada");
    }

    setTimeout(() => setMessage(""), 2000);
    setTask("");
  };

  const startEditing = (taskId, currentDescription) => {
    setEditingId(taskId);
    setTask(currentDescription);
  };

  const taskDone = (taskId) => {
    const updatedList = list.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setList(updatedList);
  };

  const confirmDelete = () => {
    setList(list.filter((task) => task.id !== taskToDelete));
    setTaskToDelete(null);
    setShowModal(false);
    setMessage("Tarea Eliminada");
    setTimeout(() => setMessage(""), 2000);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const deleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setShowModal(true);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTask("");
  };

  return (
    <>
      {message && (
        <div className="message-confir">
          <p className="p-message">{message}</p>
        </div>
      )}
      <div className="container-todo-main">
        <h1>Todo List</h1>
        <form>
          <div className="input-add">
            <input
              className="input-todo-list"
              type="text"
              placeholder="Escribir tarea..."
              value={task}
              onChange={handleInputChange}
            />
            <button className="btn-add" onClick={addOrEditTask}>
              {editingId ? "Guardar" : "Agregar"}
            </button>
            {editingId && (
              <button className="btn-cancel" onClick={cancelEditing}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="container-secund">
          {list.length === 0 ? (
            <p>No tienes nada pendiente</p>
          ) : (
            <>
              <p>Mis tareas pendientes</p>
              {list.map((taskItem) => (
                <section
                  className={`container-task ${
                    taskItem.done ? "completed-task" : ""
                  }`}
                  key={taskItem.id}
                >
                  <p
                    className={`task-description ${
                      taskItem.done ? "task-done" : ""
                    }`}
                  >
                    {taskItem.done && <span className="check-icon">✔ </span>}
                    {taskItem.description}
                  </p>
                  <p
                    className={`task-time ${taskItem.done ? "task-done" : ""}`}
                  >
                    {taskItem.time}
                  </p>
                  <div className="all-btns">
                    <button
                      className="btn-edit"
                      onClick={() =>
                        startEditing(taskItem.id, taskItem.description)
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn-done"
                      onClick={() => taskDone(taskItem.id)}
                      disabled={!!editingId}
                    >
                      {taskItem.done ? "Terminado" : "Terminar"}
                    </button>
                    <button
                      className="btn-deletee"
                      onClick={() => deleteTask(taskItem.id)}
                      disabled={!!editingId}
                    >
                      Eliminar
                    </button>
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
          <div className="modal-buttons">
            <button className="btn-add" onClick={confirmDelete}>
              Eliminar
            </button>
            <button className="btn-cancel" onClick={cancelDelete}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <Link to="/" className="volver-btn">
        Volver
      </Link>

      <div>
      <a className="enlace-todo" href="https://todolist-app-kawi.netlify.app " target="_blank">Ver proyecto completo</a>
      </div>
    </>
  );
};

export default TodoList;
