import React, { Component } from "react";

import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

import Footer from "./components/Footer/Footer";

import "./Style/app.css";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  /*  componentDidMount() {
    fetch("http://localhost:3002/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  } */

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://floating-citadel-01605.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("hi", response);
        if (response) {
          fetch("https://floating-citadel-01605.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count })); // Object.assign(target, ...sources)
            })
            .catch((err) => console.log("error happen"));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <React.Fragment>
        <div>
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          {route === "home" ? (
            <React.Fragment>
              <div>
                <Rank
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
                <div className="image-field">
                  <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                  />
                  <FaceRecognition box={box} imageUrl={imageUrl} />
                </div>
              </div>
            </React.Fragment>
          ) : route === "signin" ? (
            <React.Fragment>
              <Signin
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
              <Footer />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
              <Footer />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
