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
      await tasksApi.create({ task: { title } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
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
