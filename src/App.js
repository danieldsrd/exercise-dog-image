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
      dogObj: requestObject.message.includes('terrier') ? '' : requestObject.message,
    });
  }

  newDog() {
    this.fetchDog();
    console.log('count click');    
  }

  componentDidMount() {
    this.fetchDog();
  }

  componentDidUpdate() {
    localStorage.setItem('DogURL', this.state.dogObj);
    this.dogBreed = this.state.dogObj === '' ? 'No Dog to show. Please click the button!' : this.state.dogObj.split("/")[4]; 
    alert(this.dogBreed);
  }

  renderDogImage() {
    return (
      <div>
        <img src={this.state.dogObj} id="img-change" alt={this.dogBreed}/>        
      </div>
    )
  }

  render() {
    const { dogObj } = this.state;
    const loadingElement = <span>Loading...</span>
    return (
      <div>
        <p>{ dogObj ? this.renderDogImage() : loadingElement }</p>
        <button type="button" onClick={this.newDog}>
          New Dog!
        </button>
      </div>
    )
  }
}

export default App;
