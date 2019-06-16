import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    hello: String
  }
`;
