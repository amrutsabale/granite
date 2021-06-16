import React from "react";

import Button from "components/Button";

const Comments = ({ comments, loading, setNewComment, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-16">
        <div className="sm:grid sm:grid-cols-1 sm:gap-1 sm:items-start">
          <label
            className="block text-sm font-medium
          text-nitro-gray-800 sm:mt-px sm:pt-2"
          >
            Comment
          </label>
          <textarea
            placeholder="Ask a question or post an update"
            rows={3}
            className="flex-1 block w-full p-2 border border-bb-border
             rounded-md shadow-sm resize-none text-bb-gray-600
             focus:ring-bb-purple focus:border-bb-purple sm:text-sm"
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
        <Button type="submit" buttonText="Comment" loading={loading} />
      </form>
      {comments?.map((comment, index) => (
        <div
          key={comment.id}
          className="px-8 py-3 my-2 leading-5 flex justify-between
           border border-bb-border text-md rounded"
        >
          <p className="text-bb-gray-600" key={index}>
            {comment.content}
          </p>
          <p className="text-opacity-50 text-bb-gray-600">
            {new Date(comment.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </>
  );
};

export default Comments;
