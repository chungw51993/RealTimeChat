import React from 'react';

class AuthPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      signup: false
    };
  }

  handleChange() {
    const state = !this.state.signup;

    this.setState({
      signup: state
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.signup) {
      this.props.login(e);
    } else {
      this.props.signup(e);
    }
  }

  render() {
    const heading = () => {
      if (!this.state.signup) {
        return (<h3>Login</h3>);
      } else {
        return (<h3>Sign Up</h3>);
      }
    };

    const button = () => {
      if (!this.state.signup) {
        return (<div>Create Account: <button onClick={() => this.handleChange()}>Signup</button></div>);
      } else {
        return (<div>Already Have Account: <button onClick={() => this.handleChange()}>Login</button></div>);
      }
    };

    return (
    <div>
      { heading() }
      <form onSubmit={this.handleSubmit.bind(this)} >
        Username: <input id="username" className="form-control" type="text" />
        Passsord: <input id="password" className="form-control" type="password" />
        <input className="form-control" type="submit" value="Submit" />
      </form>
      { button() }
    </div>
    );
  }
}


export default AuthPanel;
