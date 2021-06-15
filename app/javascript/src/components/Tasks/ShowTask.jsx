import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import tasksApi from "apis/tasks";

const ShowTask = () => {
  const { slug } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);
  const [taskCreator, setTaskCreator] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(slug);
      logger.info(response.data);
      setTaskDetails(response.data.task);
      setAssignedUser(response.data.assigned_user);
      setTaskCreator(response.data.task_creator);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
        <span className="text-gray-600">Task Title : </span>{" "}
        {taskDetails?.title}
      </h1>
      <h2 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
        <span className="text-gray-600">Assigned To : </span>
        {assignedUser?.name}
      </h2>
      <h2 className="pb-3 mb-3 text-md leading-5 text-bb-gray-600 text-opacity-50">
        <span>Created By : </span>
        {taskCreator}
      </h2>
    </Container>
  );
};

export default ShowTask;
