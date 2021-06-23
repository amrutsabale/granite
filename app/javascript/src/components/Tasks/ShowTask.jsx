import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import tasksApi from "apis/tasks";
import commentsApi from "apis/comments";
import Comments from "../Comments";
import DeleteAlert from "./DeleteAlert";

const ShowTask = () => {
  const { slug } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);
  const [taskCreator, setTaskCreator] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  let history = useHistory();

  const destroyTask = async () => {
    try {
      await tasksApi.destroy(taskDetails.slug);
    } catch (error) {
      logger.error(error);
    } finally {
      history.push("/");
    }
  };

  const updateTask = () => {
    history.push(`/tasks/${taskDetails.slug}/edit`);
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(slug);
      logger.info(response.data);
      setTaskDetails(response.data.task);
      setAssignedUser(response.data.assigned_user);
      setTaskCreator(response.data.task_creator);
      setTaskId(response.data.task.id);
      setComments(response.data.comments);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await commentsApi.create({
        comment: { content: newComment, task_id: taskId },
      });
      fetchTaskDetails();
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Container>
        <div className="flex justify-between text-bb-gray-600 mt-10">
          <h1 className="pb-3 mt-5 mb-3 text-lg leading-5 font-bold">
            {taskDetails?.title}
          </h1>
          <div className="bg-bb-env px-2 mt-2 mb-4 rounded">
            <i
              className="text-2xl text-center transition duration-300
             ease-in-out ri-delete-bin-5-line hover:text-bb-red mr-2"
              onClick={() => setShowDeleteAlert(true)}
            ></i>
            <i
              className="text-2xl text-center transition duration-300
             ease-in-out ri-edit-line hover:text-bb-yellow"
              onClick={updateTask}
            ></i>
          </div>
        </div>
        <h2
          className="pb-3 mb-3 text-md leading-5 text-bb-gray-600
       text-opacity-50"
        >
          <span>Assigned To : </span>
          {assignedUser?.name}
        </h2>
        <h2 className="pb-3 mb-3 text-md leading-5 text-bb-gray-600 text-opacity-50">
          <span>Created By : </span>
          {taskCreator}
        </h2>
        <Comments
          comments={comments}
          setNewComment={setNewComment}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </Container>
      {showDeleteAlert && (
        <DeleteAlert
          onClose={() => setShowDeleteAlert(false)}
          destroyTask={destroyTask}
        />
      )}
    </>
  );
};

export default ShowTask;
