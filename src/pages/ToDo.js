import React, { useState } from "react";

import AddTask from "../components/Tasks/AddTask";
import TasksList from "../components/Tasks/TasksList";

function ToDo() {

  const [tasksList, setTasksList] = useState([]);

  function addTaskHandler(taskName, taskDescription, taskDate) {
    setTasksList((prevTasksList) => {
      return [...prevTasksList, { title: taskName, description: taskDescription, date: taskDate,
      id: Math.random().toString() }];
    });
  };

  return (
    <>
      <AddTask onAddTask={addTaskHandler} />
      <TasksList tasks={tasksList} />
    </>
  );
};

export default ToDo;