import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
const express = require("express");

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
      return "Auth Error";
    });
};

const gqlServer = () => {
  const app = express();

  const apolloServer = new ApolloServer({
    context: async ({ req }) => {
      if (req.headers.token) {
        const token = await getUidFromToken(req.headers.token);
        console.log("token!!");
        return {
          loggedInUid: token
        };
      }
      return;
    },
    typeDefs: schema,
    resolvers,
    introspection: true,
    playground: true
  });

  apolloServer.applyMiddleware({ app, path: "/", cors: true });

  return app;
};

const api = functions.https.onRequest(gqlServer());

exports.api = api;
