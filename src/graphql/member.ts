import { gql } from "apollo-boost";

export const getLoggedInUserQuery = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`;
