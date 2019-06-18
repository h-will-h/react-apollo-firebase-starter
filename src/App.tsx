import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import logo from "./logo.svg";
import { auth, client, writeLoggedInUser } from "./util";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

interface Props {}

interface State {
  loading: boolean;
}

class App extends React.Component<Props, State> {
  state = {
    loading: true
  };
  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken(true);
        writeLoggedInUser(user.uid, token);
        this.setState({
          loading: false
        });
      } else {
        writeLoggedInUser(null, null);
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
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            {loading && <img src={logo} className="App-logo" alt="logo" />}
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
