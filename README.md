# React + Typescript + Firebase + GraphQL + Apollo Starter

## Why

I've been building a few projects in this stack recently. It's a great stack to start something on, but getting started always takes longer than I think it should.

I've stubbed out pretty much everything you'd need to get the basics working, including auth.

## What's here

- Basic Apollo GraphQL server as a Firebase function.
- Basic React app w/ Apollo Client.
- Basic Auth from the React app to GraphQL.

## What's not here.

- Tests :(.
- A tutorial.

## Set up

We'll assume you have node and yarn installed.

1. Make a new project in firebase: https://console.firebase.google.com/.
1. You'll need to turn on email/password sign in and realtime database for the starter kit.
1. Follow [these instructions](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app) to set up a service account for admin. You just need to [make a new service account](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) and `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/file.json"`.
1. `npm install -g firebase`
1. `firebase login`
1. `cd functions/ && npm run deploy` to deploy it or `npm run serve` to run it locally.
1. Change `REACT_APP_FIREBASE_URL` in `.env` to point to your firebase function. For local dev, make a `.env.local` file and change `REACT_APP_FIREBASE_URL` to your local URL.
1. `cd ../ && yarn start`
