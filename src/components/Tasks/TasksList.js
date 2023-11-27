import React, { useState } from "react";

import classes from "./TasksList.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ConfirmModal from "../UI/WarningModal";

function TasksList(props) {

  const [warning, setWarning] = useState('');

  function changeTaskStatusHandler(index) {
    props.changeStatus(index);
  };

  function deleteTaskHandler(index) {
    setWarning({
      title: '¿Seguro que quiere eliminar esta tarea?',
      message: 'La Tarea se eliminará de forma permanente',
      index: index
    });
  };

  function warningHandler() {
    props.deleteTask(warning.index);
    setWarning(null);
  };

  function cancelWarningHandler() {
    setWarning(null);
  }

  return (
    <Card className={classes.tasks}>
      <ul>
        {props.tasks.map((task, index) => (
          <li key={task.id}>
            <h3 className={classes.title}>{task.title}</h3>
            <p>{task.description}</p>
            <p className={classes.date}>{task.date}</p>
            {!task.completed ? (
              <p className={classes.pending}>Pendiente</p>
            ) : (
              <p className={classes.completed}>Completada</p>
            )}
            <footer className={classes.actions}>
              <Button onClick={() => changeTaskStatusHandler(index)}>
                {!task.completed ? "Completar" : "Pendiente"}
              </Button>
              <Button danger={true} onClick={() => deleteTaskHandler(index)}>
                Eliminar Tarea
              </Button>
            </footer>
            {warning && <ConfirmModal title={warning.title} message={warning.message}
              onConfirm={warningHandler} onCancel={cancelWarningHandler} />}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TasksList;