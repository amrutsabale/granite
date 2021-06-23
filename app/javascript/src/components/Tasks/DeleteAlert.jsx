import React, { useState } from "react";
import { Alert } from "@bigbinary/neetoui";

const DeleteAlert = ({ onClose, destroyTask }) => {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      destroyTask();
      onClose();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Alert
      isOpen
      title="Delete Task"
      onClose={onClose}
      submitButtonProps={{
        style: "danger",
        label: "Delete",
        loading: deleting,
        onClick: handleDelete,
      }}
    />
  );
};
export default DeleteAlert;
