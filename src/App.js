import React from 'react';
import options from './components/ParticleOptions/options.js';
import Clarifai from 'clarifai';
import Particles from "react-tsparticles";
import Navigation from './components/Navigation/Navigation.js';
import Register from './components/Register/Register.js';
import Signin from './components/Signin/Signin.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'

const app = new Clarifai.App({
  apiKey: '13519fb43faf45a998b5aed9b72f4d04'
});

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: ""
    }
}
class App extends React.Component {

  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState ({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, 
     this.state.input)
     .then(response => {
      if (response) {
        fetch('https://calm-lowlands-26055.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count.entries}))
        })
        .catch(console.log)
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err => console.log(err));
}

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render () {
  return (
    <div className="App">
      <Particles 
      className='particles'
      id="tsparticles"
      options={options}
    />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      { this.state.route === 'home'
      ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange={ this.onInputChange } onButtonSubmit= {this.onButtonSubmit} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
        :(
          this.state.route ==='signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
        )
      }
    </div>
  );
}
}

export default App;
