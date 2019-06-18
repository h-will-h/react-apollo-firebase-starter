# React + Typescript + Firebase + GraphQL + Apollo Starter

## Why

I've been building a few projects in this stack recently. It's a great stack to start something on, but there is a bunch of boilerplate and setup that has to happen each time. Hopefully this makes it easier to get started.

I've stubbed out pretty much everything you'd need to get the basics working, including auth.

## What's here

- Apollo GraphQL server as a Firebase function.
- React app w/ Apollo Client.
- Auth that works with Firebase from client to server.

## What's not here

- Tests :(.
- A tutorial.

## Set up

We'll assume you have [node](https://nodejs.org/) and [yarn](https://yarnpkg.com/) installed.

1. Make a new project in firebase: https://console.firebase.google.com/.
1. You'll need to turn on email/password sign in and realtime database to get this working.
1. Follow [these instructions](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app) to set up a service account for admin. You just need to [make a new service account](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) and `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/file.json"`.
1. `npm install -g firebase`
1. `firebase login`
1. `firebase init` Choose `functions`, `typescript`, don't overwrite any files (just keep hitting enter).
1. `cd functions/ && npm run deploy` to deploy the server or `npm run serve` to run it locally.
1. Change `REACT_APP_FIREBASE_URL` in `.env` to point to your firebase function. For local dev, make a `.env.local` file and change `REACT_APP_FIREBASE_URL` to your local URL.
1. `cd ../ && yarn start`
