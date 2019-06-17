import { getLoggedInUser, createUser } from './helpers';

interface Ctx {
	loggedInUid: string;
}

interface CreateUser {
	name: string;
}

const resolverFunctions = {
	Query: {
		hello: () => {
			return 'world';
		},
		loggedInUser: async (a: any, p: any, { loggedInUid }: Ctx) =>
			await getLoggedInUser(loggedInUid),
	},
	Mutation: {
		createUser: async (a: any, { name }: CreateUser, { loggedInUid }: Ctx) =>
			await createUser(name, loggedInUid),
	},
};

export default resolverFunctions;
