import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import { ApolloServer } from "apollo-server-express";

import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const getUidFromToken = (token: any) => {
  if (!token) {
    return null;
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .then(function(decodedToken: any) {
      return decodedToken.uid;
    })
    .catch(function(err: any) {
      // Handle error
    });
};

const gqlServer = () => {
  const app = express();

  const apolloServer = new ApolloServer({
    context: async ({ req }) => {
      if (req.headers.token) {
        const token = await getUidFromToken(req.headers.token);
        return {
          loggedInUid: token
        };
      }
      return;
    },
    typeDefs: schema,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true
  });

  apolloServer.applyMiddleware({ app, path: "/", cors: true });

  return app;
};

const api = functions.https.onRequest(gqlServer());

exports.api = api;
