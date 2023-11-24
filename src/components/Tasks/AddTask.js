import React, { useState } from "react";

import classes from "./AddTask.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function AddTask(props) {
  const [enteredTaskName, setEnteredTaskName] = useState('');
  const [enteredTaskDescription, setEnteredTaskDescription] = useState('');
  const [enteredTaskDate, setEnteredTaskDate] = useState('');

  const [error, setError] = useState('');

  function addTaskHandler(event) {
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
    } else if (enteredTaskDate.trim().length === 0) {
      setError({
        title: 'Fecha de Tarea Inválida',
        message: 'Por favor ingrese una Fecha para la Tarea'
      });
      return;
    }

    const formatedDate = formatDate(enteredTaskDate);

    props.onAddTask(enteredTaskName, enteredTaskDescription, formatedDate);
    setEnteredTaskName('');
    setEnteredTaskDescription('');
    setEnteredTaskDate('');
  };

  function formatDate(date) {
    const enteredDate = new Date(date);
    const day = enteredDate.getDate() + 1;
    const month = enteredDate.getMonth() + 1;
    const year = enteredDate.getFullYear();

    return `${day}/${month}/${year}`;
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

  function errorHandler() {
    setError(null);
  };

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addTaskHandler}>
          <label htmlFor="taskName">Título de su Tarea</label>
          <input id="taskName" type="text" value={enteredTaskName} onChange={taskNameHandler}></input>
          <label htmlFor="taskDescription">Descripción de su Tarea</label>
          <input id="taskDescription" type="text" value={enteredTaskDescription} onChange={taskDescriptionHandler}></input>
          <label htmlFor="taskDate">Fecha Vencimiento de su Tarea</label>
          <input id="taskDate" type="date" value={enteredTaskDate} onChange={taskDateHandler}></input>
          <Button type="submit">Añadir Tarea</Button>
        </form>
      </Card>
    </>
  );
};

export default AddTask;