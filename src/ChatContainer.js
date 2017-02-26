import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import socketIoClient from 'socket.io-client';
import uuid from 'uuid';
import config from '../config/config';
import MessageStorage from './MessageStorage';
import ChatMessageList from './ChatMessageList';
import './App.css';

const io = socketIoClient(config.api.url);
io.on('event', (data) => {
  console.log('got event yo!');
  console.log({ data }, 'data');
});

io.on('disconnect', () => {
  console.log('got a disconnect yo!');
});

const styles = {
  chatMessageList: {
    position: 'fixed',
    bottom: '120px',
    left: 0,
    right: 0,
    overflow: 'auto',
  },
  sendMessageBox: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
  },
};

let currentPosition;
let currentLongitude;
let currentLatitude;

function trim1 (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function updatePosition(pos) {
  currentPosition = pos.coords;
  currentLatitude = currentPosition.latitude;
  currentLongitude = currentPosition.longitude;

  console.log('Your current position is:');
  console.log(`Latitude : ${currentLatitude}`);
  console.log(`Longitude: ${currentLongitude}`);
  console.log(`More or less ${currentPosition.accuracy} meters.`);
};

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: uuid.v4(),
      chatHistory: [],
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount() {
    if(!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updatePosition);
    }

    this.setState({ chatHistory: MessageStorage.get(this.state.chatId) });

    io.on('connect', () => {
      console.log('connected yo!');
      io.emit('room', this.state.chatId);
    });

    io.on(this.state.chatId, (message) => {
      console.log({
        room: this.state.chatId,
        message,
      });
      MessageStorage.addMessage(this.state.chatId, message);
      this.setState({ chatHistory: MessageStorage.get(this.state.chatId) });
    });
  }

  componentWillUnmount() {
  }

  handleChange(event) {
    const state = {};
    state[event.target.id] = event.target.value;
    this.setState(state);
  }

  sendMessage() {
    if (!this.state.message) {
      return;
    }

    const messageTrimmed = trim1(this.state.message);

    const message = {
      id: uuid.v4(),
      message: messageTrimmed,
      timestamp: new Date().toISOString(),
      latitude: currentLatitude,
      longitude: currentLongitude,
    };
    io.emit(this.state.chatId, message);
    MessageStorage.addMessage(this.state.chatId, message);
    this.setState({ chatHistory: MessageStorage.get(this.state.chatId), message: '' });
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      if (!event.shiftKey) {
        this.sendMessage();
      }
    }
  }

  render() {
    return (
      <div>
        <div style={styles.chatMessageList}>
          <ChatMessageList messages={this.state.chatHistory} />
        </div>
        <div>
          <Form>
            <FormGroup bsSize="large" style={styles.sendMessageBox}>
              <FormControl
                componentClass="textarea"
                id="message"
                value={this.state.message}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyPress}
              />
            <Button onClick={this.sendMessage}>Send</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default ChatContainer;
