import React, { Component } from 'react';
import MCChatList from './MCChatList';
import MapContainer from './MapContainer';
import ChatLogs from './ChatLogs';
import { Button, Col } from 'react-bootstrap';
import config from '../config/config';
import socketIoClient from 'socket.io-client';

const io = socketIoClient.connect(config.api.url);

class MissionControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatLogs: [],
    };

    io.on('connect', () => {
      console.log('connected yo!');
    });

    setInterval(() => {
      this.refresh();
    }, 500);
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    ChatLogs.getAll().then((chatLogs) => {
      this.setState({ chatLogs });
      console.log('chatLogs', chatLogs);
    });
  }

  render() {
    console.log('render', this.state.chatLogs);
    this.state.chatLogs.map((chatLog) => {
      console.log('chatLog', chatLog);
    });
    return (
      <div>
        <Col xs={12} md={6}>
          <div style={{width: '400px', height: '400px'}}>
            <MapContainer chatLogs={this.state.chatLogs} />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <MCChatList chatLogs={this.state.chatLogs} />
        </Col>
      </div>
    );
  }
}

export default MissionControl;
