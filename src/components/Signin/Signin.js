import React from "react";
import "../../Style/signIn.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      before: true,
      showMessage: false,
      text: "",
    };
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitSignIn = () => {
    /* const { signInEmail, signInPassword } = this.state;
    if (!signInEmail || signInPassword) {
      this.setState({
        text: "Opps, something is missing",
      });
      return;
    } */
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
        } else {
          this.setState({
            showMessage: !this.state.showMessage,
            before: true,
          });
        }
      });
    this.setState({ before: !this.state.before });
  };

  render() {
    let sign_in_btn = this.state.before ? "sign-in-btn" : "sign-in-btn-active";

    const { onRouteChange } = this.props;
    const { signInEmail, signInPassword, text } = this.state;
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
                  name="signInEmail"
                  value={signInEmail}
                  id="email-address"
                  onChange={this.onEmailChange}
                  required
                />
              </div>
              <div className="input-field">
                <label className="input-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="signInPassword"
                  value={signInPassword}
                  id="password"
                  onChange={this.onPasswordChange}
                  required
                />
              </div>
            </fieldset>
            {this.state.showMessage && (
              <p className="show-message">{text}Please try again!</p>
            )}
            <div className="sign-in">
              <input
                onClick={this.onSubmitSignIn}
                className={sign_in_btn}
                type="submit"
                value="Sign in"
              />
            </div>
            {/* <div className="lh-copy mt3">
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
