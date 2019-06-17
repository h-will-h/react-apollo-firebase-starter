import { getLoggedInUser } from "./helpers";

const resolverFunctions = {
  Query: {
    hello: () => {
      return "world";
    },
    loggedInUser: async (a: any, p: any, { loggedInUid }: any) =>
      await getLoggedInUser(loggedInUid)
  }
};

export default resolverFunctions;
