import { gql } from "apollo-boost";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const GET_USER_QUERY = gql`
  query User {
    user {
      id
      name
      tasks {
        id
        name
        completed
      }
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($name: String!, $completed: Boolean!) {
    createTask(input: { name: $name, completed: $completed }) {
      id
      name
      completed
    }
  }
`;

export const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      taskFeed {
        id
        name
        completed
      }
      pageInfo {
        nextPageCursor
        hasNextPage
      }
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $name: String!, $completed: Boolean!) {
    updateTask(id: $id, input: { name: $name, completed: $completed }) {
      id
      name
      completed
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      name
      completed
    }
  }
`;