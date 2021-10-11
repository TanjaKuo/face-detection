import React from "react";

import "./register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("https://floating-citadel-01605.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <article className="register-card-container ">
        <main className="register-card">
          <div className="measure">
            <fieldset id="sign_up" className="register-field">
              <legend className="register-in-word">Register</legend>
              <div className="register-input-field">
                <label className="register-input-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="register-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="register-input-field">
                <label className="register-input-label" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="register-input"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="register-input-field">
                <label className="register-input-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="register-input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="register">
              <input
                onClick={this.onSubmitSignIn}
                className="register-btn"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
