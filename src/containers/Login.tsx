import React, { Component, BaseSyntheticEvent } from "react";
import { History } from "history";
import { auth } from "../util";
interface Props {
  history: History;
}
interface State {
  email: string;
  password: string;
  error: Error | null;
}
class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null
    };
  }
  handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push(`/`);
      })
      .catch((error: any) => {
        this.setState({ error });
      });
  };
  handleKeyUp = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    //@ts-ignore
    this.setState({
      [name]: value
    });
  };
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        {error && <p>Error: {error}</p>}
        <fieldset>
          <p>
            <label>Email</label>
          </p>
          <input type="email" name="email" onChange={this.handleKeyUp} />
        </fieldset>
        <fieldset>
          <p>
            <label>Password</label>
          </p>
          <input type="password" name="password" onChange={this.handleKeyUp} />
          <p>
            <input type="submit" value="Log in" />
          </p>
        </fieldset>
      </form>
    );
  }
}

export default Login;
