import React from "react";

import classes from "./TasksList.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";

function TasksList(props) {

  function changeTaskStatusHandler(index) {
    props.changeStatus(index)
  };

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
            <button className={classes.delete}>Eliminar Tarea</button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TasksList;