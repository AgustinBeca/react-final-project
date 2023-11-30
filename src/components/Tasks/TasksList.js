import React, { useState } from "react";

import classes from "./TasksList.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Alert from "../UI/Alert";
import EditTask from "./EditTask";

function TasksList(props) {

  const [warning, setWarning] = useState();
  const [editingTask, setEditingTask] = useState();

  function changeTaskStatusHandler(id, status) {
    props.changeStatus(id, status);
  };

  function deleteTaskHandler(id) {
    setWarning({
      title: '¿Seguro que quiere eliminar esta tarea?',
      message: 'La Tarea se eliminará de forma permanente',
      index: id
    });
  };

  function warningHandler() {
    props.deleteTask(warning.index);
    setWarning(null);
  };

  function cancelWarningHandler() {
    setWarning(null);
  };

  function editTaskHandler(taskName, taskDescription, taskDate, taskId) {
    setEditingTask({
      name: taskName,
      description: taskDescription,
      due_date: taskDate,
      id: taskId,
    });
  };

  function editViewHandler(taskName, taskDescription, taskDate, taskId) {
    props.editTask(taskName, taskDescription, taskDate, taskId);
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
              <p className={classes.date}>{task.due_date}</p>
            </div>
            <footer className={classes.actions}>
              <Button color={"info"} onClick={() => editTaskHandler(task.title, task.description, task.due_date,
                task.id)}>Editar Tarea</Button>
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
                date={editingTask.due_date}
                id={editingTask.id}
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