import { gql } from 'apollo-boost';

export const getLoggedInUserQuery = gql`
	query LoggedInUser {
		loggedInUser {
			id
			name
		}
	}
`;
export const createUserMutation = gql`
	mutation CreateUser($name: String!) {
		createUser(name: $name) {
			id
			name
		}
	}
`;
