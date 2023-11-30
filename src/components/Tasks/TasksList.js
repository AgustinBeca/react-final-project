import React from "react";

import classes from "./TasksList.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";

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
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className={classes.date}>{task.due_date}</p>
            {!task.completed ? (
              <p className={classes.pending}>Pendiente</p>
            ) : (
              <p className={classes.completed}>Completada</p>
            )}
            <footer className={classes.actions}>
              <Button color={!task.completed ? "success" : "warning"}
                onClick={() => changeTaskStatusHandler(task.id, task.completed)}>
                {!task.completed ? "Completar Tarea" : " Tarea Pendiente"}
              </Button>
              <Button color={"danger"} onClick={() => deleteTaskHandler(task.id)}>
                Eliminar Tarea
              </Button>
              <Button onClick={() => editTaskHandler(task.title, task.description, task.date,
                task.id)}>Editar Tarea</Button>
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