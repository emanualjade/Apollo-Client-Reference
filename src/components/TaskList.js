import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { TASKS_QUERY } from "../graphql";

const TaskList = () => {
  const { data, loading, error } = useQuery(TASKS_QUERY);
  if (loading) return <div>Loading Tasks...</div>;
  if (error) return <div>Something went wrong loading tasks</div>;

  return (
    <>
      <h4>Tasks</h4>
      <div
        style={{
          border: "1px solid #efefef",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "15px",
          background: "#f4f4f4",
        }}
      >
        {data?.tasks?.taskFeed.map((task) => (
          <div key={task.id}>
            {task.name} - (completed: {task.completed ? "true" : "false"})
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
