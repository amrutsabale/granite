/* eslint-disable no-console */
import React, { useState } from "react";
import Container from "components/Container";
import TaskForm from "components/Tasks/Form/TaskForm";
import tasksApi from "apis/tasks";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await tasksApi.create({ task: { title } });
      logger.info("response", response);
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      logger.error("error");

      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateTask;
