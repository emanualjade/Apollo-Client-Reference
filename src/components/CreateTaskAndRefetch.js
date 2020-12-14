import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TASK_MUTATION } from "../graphql";

const CreateTaskAndRefetch = () => {
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
            completed: false,
          },
          refetchQueries: ["User", "Tasks"],
          awaitRefetchQueries: true,
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
          background: "#f4f4f4",
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
          {createTaskPending
            ? "In progress..."
            : "Create task + refetchQueries: ['User', 'Tasks']"}
        </button>
      </div>
    </form>
  );
};

export default CreateTaskAndRefetch;
