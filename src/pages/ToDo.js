import React, { useState } from "react";

import AddTask from "../components/Tasks/AddTask";
import TasksList from "../components/Tasks/TasksList";

function ToDo() {

  const [tasksList, setTasksList] = useState([]);

  function addTaskHandler(taskName, taskDescription, taskDate) {
    setTasksList((prevTasksList) => {
      return [...prevTasksList, { title: taskName, description: taskDescription, date: taskDate,
      id: Math.random().toString(), completed: false }];
    });
  };

  const completeATask = (index) => {
    let aux = [...tasksList];
    aux[index].completed = true;
    setTasksList(aux);
    console.log(tasksList);
  }

  return (
    <>
      <AddTask onAddTask={addTaskHandler} />
      <TasksList tasks={tasksList} completeATask ={completeATask} />
    </>
  );
};

export default ToDo;