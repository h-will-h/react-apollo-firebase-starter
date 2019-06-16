import { gql } from "apollo-boost";

export const loggedInUserQueryLocal = gql`
  query LoggedInUserLocal {
    loggedInUserLocal {
      uid
      token
    }
  }
`;
