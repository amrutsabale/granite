import React from "react";
import { compose, head, join, juxt, tail, toUpper } from "ramda";

const TableHeader = ({ type }) => {
  const getTitleCase = compose(join(""), juxt([compose(toUpper, head), tail]));
  const title = `${getTitleCase(type)} Tasks`;

  return (
    <thead>
      <tr>
        <th className="w-1"></th>
        <th
          className="px-6 py-3 text-xs font-bold leading-4 tracking-wider
        text-left text-bb-gray-600 text-opacity-50 uppercase bg-gray-50"
        >
          {title}
        </th>
        {type === "pending" && (
          <th
            className="px-6 py-3 text-sm font-bold leading-4 tracking-wider
        text-left text-bb-gray-600 text-opacity-50 bg-gray-50"
          >
            Assigned To
          </th>
        )}
        {type === "completed" && (
          <>
            <th style={{ width: "164px" }}></th>
            <th
              className="pl-6 py-3 text-sm font-bold leading-4
            tracking-wider text-center text-bb-gray-600
            text-opacity-50 bg-gray-50"
            >
              Delete
            </th>
          </>
        )}
        {type === "pending" && (
          <th
            className="pl-6 py-3 text-sm font-bold leading-4
          tracking-wider text-center text-bb-gray-600
          text-opacity-50 bg-gray-50"
          >
            Starred
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
