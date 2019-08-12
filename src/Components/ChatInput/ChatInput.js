import React, { Component } from 'react';
import {
  Container,
  TextField 
} from '@material-ui/core';

class ChatInput extends Component {
  sendMessage = (event) => {
    if (event.keyCode === 13) {
      this.props.sendMessage(event.target.value);
      event.target.value = '';
    }
  }
  
  render() {
    return (
      <Container maxWidth='lg'>
        <TextField
          id="userMessage"
          label={'your message:'}
          style={{ margin: 8 }}
          placeholder="Enter to send message"
          fullWidth
          autoFocus 
          margin="normal"
          onKeyUp={this.sendMessage}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Container>
    )
  }
}

export default ChatInput;