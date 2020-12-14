import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://u9ylh.sse.codesandbox.io/graphql",
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    const token = localStorage.getItem("authToken") || "";
    const headers = token
      ? {
          authorization: `Bearer ${token}`,
        }
      : {};
    operation.setContext({
      headers,
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
