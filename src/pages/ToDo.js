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

  function changeStatus(index) {
    let aux = [...tasksList];
    aux[index].completed = !aux[index].completed;
    setTasksList(aux);

    console.log(tasksList);
  };

  function deleteTask(index) {
    let aux = [...tasksList];
    aux.splice(index, 1);
    setTasksList(aux);

    console.log(tasksList);
  };

  return (
    <>
      <AddTask onAddTask={addTaskHandler} />
      <TasksList tasks={tasksList} changeStatus={changeStatus} deleteTask={deleteTask} />
    </>
  );
};

export default ToDo;