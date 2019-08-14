import React, { Component } from 'react'

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from '@material-ui/core'

import idGenerator from 'react-id-generator';
import moment from 'moment';


class ChatMessage extends Component {
  createListItems = (props) => {
    return (
      <>
        {
          props.data.map((item) => {
            let style = {color:'#313f9c', fontSize:'calc(10px + 1vmin)'};
            if (item.from === this.props.you) {
              style.color= '#f4005a';
            }
            return (
              <>
                <ListItem
                  alignItems="flex-start"
                  key={idGenerator()}
                >
                  <ListItemText
                    component="div"
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          display="inline"
                          whitespace="normal"
                          key={idGenerator()}
                          style={style}
                        >
                          {item.from + ":"}
                        </Typography>

                        {item.message}
                      </React.Fragment>
                    }
                    key={idGenerator()}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          display="inline"
                          whitespace="normal"
                          key={idGenerator()}
                        >
                          {moment(item.time).format('LLL')}
                        </Typography>

                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="div" key={idGenerator()} />
              </>
            )
          }).reverse()}
      </>
    )
  }
  render() {
    return (
      <div>
        <List>
          {this.createListItems(this.props)}
        </List>
      </div>
    )
  }
}

export default ChatMessage;