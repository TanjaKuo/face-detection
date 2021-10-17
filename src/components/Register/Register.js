import React from "react";
import "../../Style/register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      before: true,
      showMessage: false,
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitSignIn = () => {
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        showMessage: !this.state.showMessage,
      });
      return;
    }
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
    this.setState({ before: !this.state.before });
  };

  render() {
    let register_btn = this.state.before
      ? "register-btn"
      : "register-btn-active";
    const { password, confirmPassword } = this.state;
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
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="register-input-field">
                <label className="register-input-label" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  className="register-input"
                  value={confirmPassword}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            {this.state.showMessage && (
              <p className="show-message">Passwords don't macth!</p>
            )}
            <div className="register">
              <input
                onClick={this.onSubmitSignIn}
                className={register_btn}
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
