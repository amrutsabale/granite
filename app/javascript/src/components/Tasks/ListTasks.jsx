import React from "react";
import Table from "./Table";

const ListTasks = ({ data, showTask, updateTask, destroyTask }) => {
  return (
    <Table
      data={data}
      showTask={showTask}
      updateTask={updateTask}
      destroyTask={destroyTask}
    />
  );
};

export default ListTasks;
