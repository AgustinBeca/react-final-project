import React, { useState } from "react";

import classes from "./TasksList.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Alert from "../UI/Alert";
import EditTask from "./EditTask";

function TasksList(props) {

  const [warning, setWarning] = useState();
  const [editingTask, setEditingTask] = useState();

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
  };

  function editTaskHandler(index, taskName, taskDescription, taskDate, taskId, taskStatus) {
    setEditingTask({
      index: index,
      name: taskName,
      description: taskDescription,
      date: taskDate,
      id: taskId,
      completed: taskStatus
    });
  };

  function editViewHandler(taskName, taskDescription, taskDate, taskIndex, taskId, taskStatus) {
    props.editTask(taskIndex, taskName, taskDescription, taskDate, taskId, taskStatus);
    setEditingTask(null);
  };

  function cancelEditViewHandler() {
    setEditingTask(null);
  };

  return (
    <Card className={classes.tasks}>
      <ul>
        {props.tasks.map((task, index) => (
          <li key={task.id}>
            <div className={classes.details}>
              <h3 className={task.completed ? `${classes.title} ${classes.titleCompleted}` : classes.title}>
                {task.title}
              </h3>
              <Button color={task.completed ? "success" : "warning"}
                onClick={() => changeTaskStatusHandler(index)}>
                {task.completed ? "Completada" : "Pendiente"}
              </Button>
            </div>
            <div className={task.completed ? classes.details : `${classes.details} ${classes.pending}`}>
              <p className={classes.description}>{task.description}</p>
              <p className={classes.date}>{task.date}</p>
            </div>
            <footer className={classes.actions}>
              <Button color={"info"} onClick={() => editTaskHandler(index, task.title, task.description, task.date,
                task.id, task.completed)}>Editar Tarea</Button>
              <Button color={"danger"} onClick={() => deleteTaskHandler(index)}>
                Eliminar Tarea
              </Button>
            </footer>
            {warning &&
              <Alert
                title={warning.title}
                message={warning.message}
                onConfirm={warningHandler}
                onCancel={cancelWarningHandler}
                warning={true}
              />}
            {editingTask &&
              <EditTask
                name={editingTask.name}
                description={editingTask.description}
                date={editingTask.date}
                index={editingTask.index}
                id={editingTask.id}
                status={editingTask.completed}
                onConfirm={editViewHandler}
                onCancel={cancelEditViewHandler}
              />}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TasksList;