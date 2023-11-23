import React from "react";

import classes from "./TasksList.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";

function TasksList(props) {

  function completeTaskHandler(index) {
    props.completeATask(index)
  };

  return (
    <Card className={classes.tasks}>
      <ul>
        {props.tasks.map((task, index) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className={classes.date}>{task.date}</p>
            {!task.completed && <Button onClick={() => completeTaskHandler(index)}>Completar</Button>}
            {task.completed && <p className={classes.status}>Completada</p>}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TasksList;