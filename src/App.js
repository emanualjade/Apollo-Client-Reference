import React from "react";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";
import LoginForm from "./components/LoginForm";
import UserTaskList from "./components/UserTaskList";
import TaskList from "./components/TaskList";
import TaskListActions from "./components/TaskListActions";
import CreateTask from "./components/CreateTask";
import CreateTaskAndRefetch from "./components/CreateTaskAndRefetch";
import CreateTaskAndUpdate from "./components/CreateTaskAndUpdate";
import CreateTaskAndOptimistic from "./components/CreateTaskAndOptimistic";
import CreateTaskAndOptimisticError from "./components/CreateTaskAndOptimisticError";

import { GET_USER_QUERY } from "./graphql";

function App() {
  const { data, loading, refetch } = useQuery(GET_USER_QUERY, {
    errorPolicy: "ignore"
  });
  const isLoggedIn = data && data.user && data.user.__typename === "User";

  if (loading) return <div>Loading...</div>;
  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      {isLoggedIn ? (
        <div>
          Howdy {data.user.name}{" "}
          <button
            onClick={async () => {
              localStorage.removeItem("authToken");
              await refetch({ errorPolicy: "ignore" });
            }}
          >
            Logout
          </button>
          <h3>Apollo Client Examples</h3>
          <div
            style={{
              border: "1px solid #efefef",
              borderRadius: "8px",
              padding: "15px",
              marginTop: "15px",
              background: "#f4f4f4"
            }}
          >
            <p>
              <strong>Create task</strong>
            </p>
            <ul>
              <li>Create only</li>
              <li>+ refetch</li>
              <li>+ update</li>
              <li>+ optimistic update</li>
              <li>+ optimistic update that has an error</li>
            </ul>
            <p>
              <strong>Update task</strong>
            </p>
            <ul>
              <li>Update only</li>
              <li>+ optimistic update</li>
              <li>+ optimistic update that has an error</li>
            </ul>
            <p>
              <strong>Delete task</strong>
            </p>
            <ul>
              <li>Delete only</li>
              <li>+ refetch</li>
              <li>+ update</li>
              <li>+ optimistic update</li>
              <li>+ optimistic update that has an error</li>
            </ul>
          </div>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "2px 2px 10px #8a8a8a36",
              padding: "15px",
              position: "fixed",
              left: "15px",
              top: "15px"
            }}
          >
            <UserTaskList />
            <TaskList />
          </div>
        </div>
      ) : (
        <LoginForm />
      )}

      {isLoggedIn ? (
        <div>
          <div style={{ marginBottom: "15px", marginTop: "15px" }}>
            <h3>Create Task</h3>
            <CreateTask />
            <CreateTaskAndRefetch />
            <CreateTaskAndUpdate />
            <CreateTaskAndOptimistic />
            <CreateTaskAndOptimisticError />
          </div>
          <TaskListActions />
        </div>
      ) : null}
    </div>
  );
}

export default App;
