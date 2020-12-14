import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_QUERY } from "../graphql";

const UserTaskList = () => {
  const { data } = useQuery(GET_USER_QUERY, {
    errorPolicy: "ignore"
  });
  return (
    <>
      <h4 style={{ marginTop: 0 }}>Tasks nested on the user query</h4>
      <div
        style={{
          border: "1px solid #efefef",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "15px",
          background: "#f4f4f4"
        }}
      >
        {data.user.tasks.map((task) => (
          <div key={task.id}>
            {task.name} - (completed: {task.completed ? "true" : "false"})
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTaskList;
