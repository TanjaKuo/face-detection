import React from "react";
import "./signIn.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("https://floating-citadel-01605.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" }, // because -, so using {} to cover
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.onRouteChange("home");
          this.props.loadUser(user);
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="card-container">
        <main className="card">
          <div className="measure">
            <fieldset id="sign_up" className="sign-in-field">
              <legend className="sign-in-word">Sign In</legend>
              <div className="input-field ">
                <label className="input-label" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="input-field">
                <label className="input-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="sign-in">
              <input
                onClick={this.onSubmitSignIn}
                className="sign-in-btn"
                type="submit"
                value="Sign in"
              />
            </div>
            {/*          <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div> */}
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
