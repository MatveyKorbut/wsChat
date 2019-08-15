import React, { Component } from 'react';
import './App.css';

import Header from './Components/Header/Header'
import Chat from './Components/Chat/Chat'

class App extends Component {
  state = {
    username: 'noName',
  }

  saveName = (username) => {
    this.setState({username});
    localStorage.setItem('username', username);
  }

  componentDidMount() {
    Notification.requestPermission();

    if(localStorage.getItem('username')) {
      this.setState({username : localStorage.getItem('username')});
      const notification = new Notification('Welcome back, ' + localStorage.getItem('username'))
    }
  }

  
  render() {
    return(
      <div className="App">
        <Header name={this.state.username} saveName={this.saveName}></Header>
        <Chat name={this.state.username}/>
      </div>
    )
  }
    
}


export default App;
