
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import MCChatList from './MCChatList';
import config from '../config/config';
import ChatLogs from './ChatLogs';
import './App.css';

class MCChatListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatLogs: [],
    };
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
        <MCChatList chatLogs={this.state.chatLogs} />
      </div>
    );
  }
}

export default MCChatListContainer;
