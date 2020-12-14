import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { TASKS_QUERY, CREATE_TASK_MUTATION, GET_USER_QUERY } from "../graphql";

const CreateTaskAndUpdate = () => {
  const [taskName, setTaskName] = useState("");

  const [createTask, { loading: createTaskPending }] = useMutation(
    CREATE_TASK_MUTATION
  );

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (!taskName) {
          return;
        }
        await createTask({
          variables: {
            name: taskName,
            completed: false
          },
          update(cache, result) {
            if (result.data.createTask.__typename !== "Task") {
              return;
            }
            // UPDATE GET_USER_QUERY
            const userDataFromCache = cache.readQuery({
              query: GET_USER_QUERY
            });
            if (userDataFromCache.user.__typename === "User") {
              const newUserData = {
                user: {
                  ...userDataFromCache.user,
                  tasks: [
                    result.data.createTask,
                    ...userDataFromCache.user.tasks
                  ]
                }
              };
              cache.writeQuery({
                query: GET_USER_QUERY,
                data: newUserData
              });
            }

            // UPDATE TASKS_QUERY
            const data = cache.readQuery({ query: TASKS_QUERY });
            if (data?.tasks.__typename === "TaskFeed") {
              const taskFeed = data.tasks.taskFeed.map((task) => {
                return { ...task };
              });
              const newTasksData = {
                tasks: {
                  ...data.tasks,
                  pageInfo: { ...data.tasks.pageInfo },
                  taskFeed: [result.data.createTask, ...taskFeed]
                }
              };
              cache.writeQuery({
                query: TASKS_QUERY,
                data: newTasksData
              });
            }
          }
        });
        setTaskName("");
      }}
    >
      <div
        style={{
          border: "1px solid #efefef",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "15px",
          background: "#f4f4f4"
        }}
      >
        <input
          style={{ padding: "8px", fontSize: "16px" }}
          placeholder="Task name"
          value={taskName}
          onChange={(event) => {
            setTaskName(event.target.value);
          }}
        />{" "}
        <button>
          {createTaskPending ? "In progress..." : "Create task + update"}
        </button>
      </div>
    </form>
  );
};

export default CreateTaskAndUpdate;
