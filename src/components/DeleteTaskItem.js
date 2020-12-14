import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TASK_MUTATION, GET_USER_QUERY, TASKS_QUERY } from "../graphql";

const DeleteTaskItem = ({ id, name, completed }) => {
  const [deleteTask, { loading: deletePending }] = useMutation(
    DELETE_TASK_MUTATION
  );

  return (
    <div style={{ borderTop: "1px solid #efefef", padding: "15px 0" }}>
      {name}
      {" - "} (completed: {completed ? "true" : "false"})
      <div style={{ marginTop: "5px" }}>
        <button
          className="button"
          onClick={() => {
            deleteTask({
              variables: { id }
            });
          }}
        >
          Delete only
        </button>{" "}
        <button
          onClick={() => {
            deleteTask({
              variables: { id },
              refetchQueries: ["Tasks", "User"],
              awaitRefetchQueries: true
            });
          }}
        >
          Delete and refetch
        </button>{" "}
        <button
          onClick={() => {
            deleteTask({
              variables: { id },
              update(cache, result) {
                if (result.data.deleteTask.__typename !== "Task") {
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
                        ...userDataFromCache.user.tasks.filter(
                          (task) => task.id !== id
                        )
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
                      taskFeed: [...taskFeed.filter((task) => task.id !== id)]
                    }
                  };
                  cache.writeQuery({
                    query: TASKS_QUERY,
                    data: newTasksData
                  });
                }
              }
            });
          }}
        >
          Delete and update
        </button>{" "}
        <button
          onClick={() => {
            deleteTask({
              variables: { id },
              update(cache, result) {
                if (result.data.deleteTask.__typename !== "Task") {
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
                        ...userDataFromCache.user.tasks.filter(
                          (task) => task.id !== id
                        )
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
                      taskFeed: [...taskFeed.filter((task) => task.id !== id)]
                    }
                  };
                  cache.writeQuery({
                    query: TASKS_QUERY,
                    data: newTasksData
                  });
                }
              },
              optimisticResponse: {
                __typename: "Mutation",
                deleteTask: {
                  __typename: "Task",
                  completed,
                  id,
                  name
                }
              }
            });
          }}
        >
          Delete optimistic
        </button>
      </div>
      {deletePending ? "Deleting..." : null}
    </div>
  );
};

export default DeleteTaskItem;
