import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TableRow = ({
  type = "pending",
  data,
  destroyTask,
  showTask,
  handleProgressToggle,
  starTask,
}) => {
  const isCompleted = type === "completed";
  const toggledProgress = isCompleted ? "pending" : "completed";
  return (
    <tbody className="bg-white divide-y divide-bb-gray-600">
      {data.map((rowData) => (
        <tr key={rowData.id}>
          <td className="px-6 py-4 text-center">
            <input
              type="checkbox"
              checked={isCompleted}
              className="ml-6 w-4 h-4 text-bb-purple border-gray-300
               rounded form-checkbox focus:ring-bb-purple cursor-pointer"
              onChange={() =>
                handleProgressToggle({
                  slug: rowData.slug,
                  progress: toggledProgress,
                })
              }
            />
          </td>
          <td
            className={classnames(
              "px-6 py-4 text-sm font-medium leading-5 whitespace-no-wrap text-bb-purple",
              {
                "cursor-pointer": !isCompleted,
              },
              { "text-opacity-50": isCompleted }
            )}
            onClick={() => !isCompleted && showTask(rowData.slug)}
          >
            {rowData.title}
          </td>
          {!isCompleted && (
            <>
              <td
                className="px-6 py-4 text-sm font-medium leading-5
                            text-bb-gray-600 whitespace-no-wrap"
              >
                {rowData.user.name}
              </td>
              <td className="pl-6 py-4 text-center cursor-pointer">
                <i
                  className={classnames(
                    "transition duration-300 ease-in-out text-2xl hover:text-bb-yellow p-1",
                    {
                      "text-bb-border ri-star-line":
                        rowData.status !== "starred",
                    },
                    {
                      "text-white text-bb-yellow ri-star-fill":
                        rowData.status === "starred",
                    }
                  )}
                  onClick={() => starTask(rowData.slug, rowData.status)}
                ></i>
              </td>
            </>
          )}
          {isCompleted && (
            <>
              <td style={{ width: "164px" }}></td>
              <td className="px-6 py-4 text-center cursor-pointer">
                <i
                  className="text-2xl text-center text-bb-border
                  transition duration-300 ease-in-out
                  ri-delete-bin-5-line hover:text-bb-red"
                  onClick={() => destroyTask(rowData.slug)}
                ></i>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  destroyTask: PropTypes.func,
  showTask: PropTypes.func,
  handleProgressToggle: PropTypes.func,
};

export default TableRow;
