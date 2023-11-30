import React, { useState } from "react";

import classes from "./EditTask.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function EditTask(props) {

  const [enteredTaskName, setEnteredTaskName] = useState(props.name);
  const [enteredTaskDescription, setEnteredTaskDescription] = useState(props.description);
  const [enteredTaskDate, setEnteredTaskDate] = useState(props.date);

  const [error, setError] = useState();

  function updateTaskHandler(event) {
    event.preventDefault();

    if (enteredTaskName.trim().length === 0) {
      setError({
        title: 'Título de Tarea Inválido',
        message: 'Por favor ingrese un Título para la Tarea'
      });
      return;
    } else if (enteredTaskDescription.trim().length === 0) {
      setError({
        title: 'Descripción de Tarea Inválida',
        message: 'Por favor ingrese una Descripción para la Tarea'
      });
      return;
    } else if (enteredTaskDate === undefined) {
      setError({
        title: 'Fecha de Tarea Inválida',
        message: 'Por favor ingrese una Fecha para la Tarea'
      });
      return;
    }

    props.onConfirm(enteredTaskName, enteredTaskDescription, enteredTaskDate, props.id);
  };

  function taskNameHandler(event) {
    setEnteredTaskName(event.target.value);
  };

  function taskDescriptionHandler(event) {
    setEnteredTaskDescription(event.target.value);
  };

  function taskDateHandler(event) {
    setEnteredTaskDate(event.target.value);
  };

  function errorHandler(){
    setError(null);
  };

  return (
    <>
      <div className={classes.backdrop} onClick={props.onCancel} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>Editar Tarea</h2>
        </header>
        <div className={classes.content}>
          <form onSubmit={updateTaskHandler}>
            <label htmlFor="taskName">Título de su Tarea</label>
            <input id="taskName" type="text" value={enteredTaskName} onChange={taskNameHandler}></input>
            <label htmlFor="taskDescription">Descripción de su Tarea</label>
            <input id="taskDescription" type="text" value={enteredTaskDescription} onChange={taskDescriptionHandler}></input>
            <label htmlFor="taskDate">Fecha Vencimiento de su Tarea</label>
            <input id="taskDate" type="date" value={enteredTaskDate} onChange={taskDateHandler}></input>
            <footer className={classes.actions}>
              <Button type="submit" color={"warning"} onClick={updateTaskHandler}>Actualizar Tarea</Button>
              <Button onClick={props.onCancel}>Cancelar</Button>
            </footer>
          </form>
        </div>
      </Card>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
    </>
  )
};

export default EditTask;