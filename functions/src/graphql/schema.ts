import { gql } from "apollo-server-express";

const schema = gql`
  type User {
    id: String
  }
  type Query {
    hello: String
    loggedInUser: User
  }
`;

export default schema;
