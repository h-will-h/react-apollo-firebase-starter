import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { auth, client, writeLoggedInUser, getLoggedInUser } from "./util";
import { getLoggedInUserQuery } from "./graphql/member";
import { ApolloProvider, Query } from "react-apollo";

interface Props {}

interface State {
  loading: boolean;
}

class App extends React.Component<Props, State> {
  state = {
    loading: true
  };
  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(async User => {
      if (User) {
        const token = await User.getIdToken(true);
        writeLoggedInUser(User.uid, token);
        this.setState({
          loading: false
        });
      } else {
        writeLoggedInUser("", "");
        this.setState({
          loading: false
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  removeListener = () => {};
  render() {
    const { loading } = this.state;
    const { token } = getLoggedInUser();
    return (
      <ApolloProvider client={client}>
        <div className="App">
          {loading && <img src={logo} className="App-logo" alt="logo" />}
          {!loading && (
            <Query
              query={getLoggedInUserQuery}
              context={{
                headers: {
                  token
                }
              }}
            >
              {({ loading, error, data }: any) => {
                const { uid } = data.loggedInUser;
                if (loading) {
                  return <img src={logo} className="App-logo" alt="logo" />;
                }
                if (error) {
                  return <div className="error">Something went wrong...</div>;
                }
                return (
                  <>
                    <h1>Hi</h1>
                    {uid ? (
                      <div>Great, you're logged in!</div>
                    ) : (
                      <div>Log in or Sign up</div>
                    )}
                  </>
                );
              }}
            </Query>
          )}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
