import React from "react";
import Table from "./Table";

const ListTasks = ({ data, showTask }) => {
  return <Table data={data} showTask={showTask} />;
};

export default ListTasks;
