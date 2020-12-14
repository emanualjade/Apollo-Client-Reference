import React from "react";
import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION, GET_USER_QUERY } from "../graphql";

const LoginForm = () => {
  const [email, setEmail] = useState("ejade@gmail.com");
  const [password, setPassword] = useState("asdfasdf");

  const [getUserQuery] = useLazyQuery(GET_USER_QUERY, {
    errorPolicy: "ignore",
    fetchPolicy: "network-only",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login.__typename === "Token") {
        localStorage.setItem("authToken", data.login.token);
        getUserQuery();
      }
    },
  });

  return (
    <div>
      <label>
        Email
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </label>
      <label>
        password
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </label>
      <button
        onClick={async () => {
          await login({
            variables: {
              email,
              password,
            },
          });
        }}
      >
        Login
      </button>{" "}
    </div>
  );
};

export default LoginForm;
