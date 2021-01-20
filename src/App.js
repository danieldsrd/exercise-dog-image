import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dogObj: undefined,
      loading: true,      
    };
    this.renderDogImage = this.renderDogImage.bind(this);
    this.newDog = this.newDog.bind(this);
  }

  async fetchDog() {
    const requestHeaders = { headers: { Accept: 'application/json' } };
    const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random', requestHeaders);
    const requestObject = await requestReturn.json();    
    this.setState({
      dogObj: requestObject.message,
    });
  }

  newDog() {
    this.fetchDog();
    console.log('count click');
  }

  componentDidMount() {
    this.fetchDog();
  }

  renderDogImage() {
    return (
      <div>
        <img src={this.state.dogObj} id="img-change" alt="dog"/>
        <button type="button" onClick={this.newDog}>
          Novo Doguinho!
        </button>
      </div>
    )
  }

  render() {
    const { dogObj } = this.state;
    const loadingElement = <span>Loading...</span>
    return (
      <div>
        <p>{ dogObj ? this.renderDogImage() : loadingElement }</p>
      </div>
    )
  }
}

export default App;
