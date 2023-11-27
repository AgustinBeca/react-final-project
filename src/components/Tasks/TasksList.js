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
      title: 'Seguro que quiere eliminar esta tarea?',
      message: 'Esta Tarea se eliminará de forma permanente',
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
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className={classes.date}>{task.date}</p>
            {!task.completed ? (
              <>
                <p className={classes.pending}>Pendiente</p>
                <Button onClick={() => changeTaskStatusHandler(index)}>Completar</Button>
              </>
            ) : (
              <>
                <p className={classes.completed}>Completada</p>
                <Button onClick={() => changeTaskStatusHandler(index)}>Pendiente</Button>
              </>
            )}
            <button className={classes.delete} onClick={() => deleteTaskHandler(index)}>
              Eliminar Tarea
            </button>
            {warning && <ConfirmModal title={warning.title} message={warning.message}
              onConfirm={warningHandler} onCancel={cancelWarningHandler} />}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TasksList;