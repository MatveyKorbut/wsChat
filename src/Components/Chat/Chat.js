import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import idGenerator from 'react-id-generator';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import ChatMessage from '../ChatMessage/ChatMessage';
import ChatInput from '../ChatInput/ChatInput';
import ConnectionStatusBar from '../ConnectionStatusBar/ConnectionStatusBar';

const URL = 'ws://st-chat.shas.tel';


class Chat extends Component {
  state = {
    messages: [],
    focused: true,
    loading: true,
    connected:false,
  }

  ws = new ReconnectingWebSocket(URL);
  scrollToBottom() {
    this.el.scrollIntoView();
  }

  onBlur = () => {
    this.state.focused = false;
  };

  onFocus = () => {
    this.state.focused = true;
  }
  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected');
      const notification = new Notification('Connected to chat');
      this.state.connected = true;
      console.log('status is ' + this.state.connected)
    }

    this.ws.onclose = () => {
      this.state.connected = false;
    }

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
      
      if(message[0]) {
        if (!this.state.focused) {
          if (message[0].from !== this.props.name){
            const options = {
              body: message[0].message,
            }
            const notification = new Notification(`New message from ${message[0].from}`);
          }  
        }
      }
    }

    this.ws.onclose = () => {
      const notification = new Notification('Disconnected from chat')
    }
        
    window.addEventListener("focus", this.onFocus);
    window.addEventListener('blur', this.onBlur);
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.state.loading=false;
  }
  
  componentWilUnmount() {
    window.removeEventListener("focus", this.onFocus)
    window.addEventListener('blur', this.onBlur);
}

  addMessage = message => {
    if (Array.isArray(message)) {
      this.setState(state => ({ messages: message.concat(state.messages) }))
    }
    //console.log(this.state.messages)
  }
  
  sendMessage = (m) => {
    let message = {from: this.props.name, message: m};
    this.ws.send(JSON.stringify(message));
  }

  
  ////////////////////////
  render() {

    return (
      <>

      <Container
      id='chatList'
      maxWidth='md'
      style={{
        height: '72vh',
        overflowY: "scroll",
        overflowX: "hidden",
        marginTop: "3%",
        marginBottom: "3%"
      }}
      >   
      {this.state.loading? <CircularProgress/> : <></>}
      <ChatMessage key={idGenerator()} data={this.state.messages}/>
      <div ref={el => { this.el = el; }} />
        
      </Container>
      <Container>
        <ConnectionStatusBar status={this.state.connected}/>
      </Container>
 
      <ChatInput sendMessage={this.sendMessage} name={this.props.name}/>
      </>
     
    )
  }
};

export default Chat;