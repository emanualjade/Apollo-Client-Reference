import React from "react";
import { useQuery } from "@apollo/react-hooks";
import TaskItem from "./TaskItem";
import TaskItemOptimistic from "./TaskItemOptimistic";
import DeleteTaskItem from "./DeleteTaskItem";
import { TASKS_QUERY } from "../graphql";

const TaskListActions = () => {
  const { data, loading, error } = useQuery(TASKS_QUERY);
  if (loading) return <div>Loading Tasks...</div>;
  if (error) return <div>Something went wrong loading tasks</div>;

  return (
    <>
      <h3>Update task item - no refetch - no optimistic</h3>
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
            <TaskItem
              key={task.id}
              id={task.id}
              defaultValue={task.name}
              isChecked={task.completed}
            />
          </div>
        ))}
      </div>
      <h3>Update task item - optimistic update</h3>
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
            <TaskItemOptimistic
              key={task.id}
              id={task.id}
              defaultValue={task.name}
              isChecked={task.completed}
            />
          </div>
        ))}
      </div>
      <h3>Delete task item</h3>
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
            <DeleteTaskItem
              key={task.id}
              id={task.id}
              name={task.name}
              completed={task.completed}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskListActions;
