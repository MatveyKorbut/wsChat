import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Container,
  Button
} from '@material-ui/core'

class Header extends Component {
  setName = () =>{
    this.props.saveName(document.querySelector('#userName').value);
    document.querySelector('#userName').value='';
  }

  render() {
    return (
      <header>
        <Container maxWidth='lg'>
          <AppBar position="static" color="default" >
              <Toolbar>
                <Typography variant="h6" color="inherit" style={{flexGrow: '1'}}>
                  Your name is {this.props.name}
                </Typography>
                <TextField
                  id="userName"
                  style={{ margin: 8 }}
                  placeholder='Enter your name here...'
                >
                </TextField>
                <Button color="inherit" style={{marginRight: '1%', border: '1px solid #9a9a9c'}} onClick={this.setName}>Save name</Button>
              </Toolbar>
            </AppBar>
          </Container>
      </header>
    )
  }
};

export default Header