import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class ConnectionStatusBar extends React.Component {

  render() {
    
    return (
      this.props.status? <LinearProgress color='primary'/> : <LinearProgress color='secondary'/>
    )
  }
}

export default ConnectionStatusBar;