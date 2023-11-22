import React from "react";

import classes from "./TasksList.module.css";

import Card from "../UI/Card";


function TasksList(props) {
  return (
    <Card className={classes.tasks}>
      <ul>
        {props.tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className={classes.date}>{task.date}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TasksList;