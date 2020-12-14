import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TASK_MUTATION } from "../graphql";

const TaskItem = ({ id, defaultValue, isChecked }) => {
  const [name, setName] = useState(defaultValue);
  const [completed, setCompleted] = useState(isChecked);

  const lastDefault = useRef(defaultValue);
  const lastIsChecked = useRef(isChecked);

  useEffect(() => {
    if (defaultValue !== lastDefault.current) {
      setName(defaultValue);
      lastDefault.current = defaultValue;
    }
    if (isChecked !== lastIsChecked.current) {
      setCompleted(isChecked);
      lastIsChecked.current = isChecked;
    }
  }, [defaultValue, isChecked, lastDefault, lastIsChecked]);

  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  const handleInputChange = (event) => {
    setName(event.target.value);
    if (!event.target.value) {
      return;
    }
    updateTask({ variables: { id, name: event.target.value, completed } });
  };

  const handleCompletedChange = (event) => {
    setCompleted(event.target.checked);
    if (!event.target.value) {
      return;
    }
    updateTask({ variables: { id, name, completed: event.target.checked } });
  };

  return (
    <div
      style={{
        borderBottom: "1px solid #efefef",
        paddingBottom: "10px",
        marginBottom: "10px",
      }}
    >
      <input
        style={{
          border: `${name.length === 0 ? "1px solid red" : "1px solid #ccc"}`,
          padding: "8px",
          fontSize: "16px",
        }}
        value={name}
        onChange={handleInputChange}
      />{" "}
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCompletedChange}
      />{" "}
    </div>
  );
};

export default TaskItem;
