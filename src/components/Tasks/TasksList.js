import React, { useState } from "react";

import classes from "./TasksList.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import WarningModal from "../UI/WarningModal";
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
            <h3 className={classes.title}>{task.title}</h3>
            <p>{task.description}</p>
            <p className={classes.date}>{task.date}</p>
            {!task.completed ? (
              <p className={classes.pending}>Pendiente</p>
            ) : (
              <p className={classes.completed}>Completada</p>
            )}
            <footer className={classes.actions}>
              <Button color={!task.completed ? "success" : "warning"}
                onClick={() => changeTaskStatusHandler(index)}>
                {!task.completed ? "Completar Tarea" : " Tarea Pendiente"}
              </Button>
              <Button color={"danger"} onClick={() => deleteTaskHandler(index)}>
                Eliminar Tarea
              </Button>
              <Button onClick={() => editTaskHandler(index, task.title, task.description, task.date,
                task.id, task.completed)}>Editar Tarea</Button>
            </footer>
            {warning &&
              <WarningModal
                title={warning.title}
                message={warning.message}
                onConfirm={warningHandler}
                onCancel={cancelWarningHandler}
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