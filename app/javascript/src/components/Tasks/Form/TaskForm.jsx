import React from "react";
import Select from "react-select";
import Input from "components/Input";
import Button from "components/Button";

const TaskForm = ({
  type = "create",
  title,
  setTitle,
  assignedUser,
  users,
  setUserId,
  loading,
  handleSubmit,
}) => {
  const userOptions = users?.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  const defaultOption = {
    value: assignedUser?.id,
    label: assignedUser?.name,
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Docs Revamp"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex flex-row items-center justify-start mt-3">
        <p className="w-3/12 leading-5 text-gray-800 text-md">Assigned To: </p>
        <div className="w-full">
          <Select
            options={userOptions}
            defaultValue={defaultOption}
            onChange={(e) => setUserId(e.value)}
            isSearchable
          />
        </div>
      </div>
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Task" : "Update Task"}
        loading={loading}
      />
    </form>
  );
};

export default TaskForm;
