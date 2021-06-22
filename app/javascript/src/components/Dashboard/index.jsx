import React, { useState, useEffect } from "react";
import { all, isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import Table from "components/Tasks/Table";
import PageLoader from "components/PageLoader";
import tasksApi from "apis/tasks";
import DeleteAlert from "components/Tasks/DeleteAlert";

const Dashboard = ({ history }) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [slug, setSlug] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await tasksApi.list();
      const { pending, completed } = response.data.tasks;
      setPendingTasks(pending);
      setCompletedTasks(completed);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const destroyTask = async (slug) => {
    try {
      await tasksApi.destroy(slug);
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  const deleteTask = (slug) => {
    setShowDeleteAlert(true);
    setSlug(slug);
  };

  const showTask = (slug) => {
    history.push(`/tasks/${slug}/show`);
  };

  const handleProgressToggle = async ({ slug, progress }) => {
    try {
      await tasksApi.update({ slug, payload: { task: { progress } } });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const starTask = async (slug, status) => {
    try {
      const toggledStatus = status === "starred" ? "unstarred" : "starred";
      await tasksApi.update({
        slug,
        payload: { task: { status: toggledStatus } },
      });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (all(either(isNil, isEmpty), [pendingTasks, completedTasks])) {
    return (
      <Container>
        <h1 className="my-5 text-xl leading-5 text-center">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      {!either(isNil, isEmpty)(pendingTasks) && (
        <Table
          data={pendingTasks}
          showTask={showTask}
          handleProgressToggle={handleProgressToggle}
          starTask={starTask}
        />
      )}
      {!either(isNil, isEmpty)(completedTasks) && (
        <Table
          type="completed"
          data={completedTasks}
          deleteTask={deleteTask}
          handleProgressToggle={handleProgressToggle}
        />
      )}
      {showDeleteAlert && (
        <DeleteAlert
          onClose={() => setShowDeleteAlert(false)}
          destroyTask={() => destroyTask(slug)}
        />
      )}
    </Container>
  );
};

export default Dashboard;
