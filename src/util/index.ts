import * as firebase from "firebase";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { loggedInUserQueryLocal } from "../graphql/local";
const firebaseConfig = require("../firebase-config.json");

firebase.initializeApp(firebaseConfig);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:
    process.env.REACT_APP_FIREBASE_URL ||
    "https://[xxx].cloudfunctions.net/graphql"
});

export const auth = firebase.auth();

export const writeLoggedInUser = (uid: string, token: string) => {
  client.writeQuery({
    query: loggedInUserQueryLocal,
    data: {
      loggedInUserLocal: {
        uid: uid,
        token,
        __typename: "loggedInUserLocal"
      }
    }
  });
};
export const getLoggedInUser = () => {
  let loggedInUser = { token: "", uid: "" };
  try {
    const { loggedInUserLocal }: any = client.readQuery({
      query: loggedInUserQueryLocal
    });
    loggedInUser = loggedInUserLocal;
  } catch (e) {}
  return loggedInUser;
};
