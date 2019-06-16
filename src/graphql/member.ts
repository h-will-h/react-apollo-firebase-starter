import { gql } from "apollo-boost";

export const getLoggedInUserQuery = gql`
    loggedInUser {
        id
    }
`;
