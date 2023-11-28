import React, { useState } from "react";

import AddTask from "../components/Tasks/AddTask";
import TasksList from "../components/Tasks/TasksList";

function ToDo() {

  const [tasksList, setTasksList] = useState([]);

  function addTaskHandler(taskName, taskDescription, taskDate) {
    setTasksList((prevTasksList) => {
      return [...prevTasksList, {
        title: taskName, description: taskDescription, date: taskDate,
        id: Math.random().toString(), completed: false
      }];
    });
  };

  function changeStatusHandler(index) {
    let aux = [...tasksList];
    aux[index].completed = !aux[index].completed;
    setTasksList(aux);

    console.log(tasksList);
  };

  function deleteTaskHandler(index) {
    let aux = [...tasksList];
    aux.splice(index, 1);
    setTasksList(aux);

    console.log(tasksList);
  };

  function editTaskHandler(index, taskName, taskDescription, taskDate, taskId, taskStatus) {
    let aux = [...tasksList];
    aux.splice(index, 1);

    setTasksList(aux);

    setTasksList((prevTasksList) => {
      return [...prevTasksList, {
        title: taskName, description: taskDescription, date: taskDate,
        id: taskId, completed: taskStatus
      }];
    });

    console.log(tasksList);
  };

  return (
    <>
      <AddTask onAddTask={addTaskHandler} />
      <TasksList tasks={tasksList} changeStatus={changeStatusHandler} deleteTask={deleteTaskHandler}
        editTask={editTaskHandler} />
    </>
  );
};

export default ToDo;