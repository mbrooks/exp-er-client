import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
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

function trim1 (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

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
        <ChatMessageList messages={this.state.chatHistory} />
        <div>
          <Form>
            <FormGroup bsSize="large">
              <FormControl
                componentClass="textarea"
                id="message"
                value={this.state.message}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyPress}
              />
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default ChatContainer;
