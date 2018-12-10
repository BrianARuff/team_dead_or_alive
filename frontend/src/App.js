import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor() {

    super();
    this.state = {



    }

  }

  componentDidMount() {

    // axios.get('http://localhost:5000')
    //   .then(res => this.setState({serverResp: res.data}))
    //   .catch(err => console.log(err));

  }

  render() {
    return (
      <div className="App">
        <p>Testing</p>
      </div>
    );
  }
}

export default App;
