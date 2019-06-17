import { gql } from 'apollo-server-express';

const schema = gql`
	type User {
		id: String
		name: String
	}
	type Query {
		hello: String
		loggedInUser: User
	}
	type Mutation {
		createUser(name: String): User
	}
`;

export default schema;
