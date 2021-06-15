import React, { useState, useEffect } from "react";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import TaskForm from "components/Tasks/Form/TaskForm";
import tasksApi from "apis/tasks";
import usersApi from "apis/users";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await tasksApi.create({ task: { title, user_id: userId } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      logger.info(response);
      setUsers(response.data.users);
      setUserId(response.data.users[0].id);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}
        setUserId={setUserId}
        assignedUser={users && users[0]}
        users={users}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateTask;
