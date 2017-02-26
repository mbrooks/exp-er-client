import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import ChatLogs from './ChatLogs';
import ChatMessageList from './ChatMessageList';

class MCChatDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: props.params.chatId,
      chatHistory: [],
      message: ''
    };

    ChatLogs.getAll().then((chatLogs) => {
      const chatLog = chatLogs.find((cl) => {
        return cl.id === props.params.chatId;
      });
      this.setState({ chatLog });
      console.log('chatLog', chatLog);
    });
  }

  render() {
    if (!this.state.chatLog) {
      return (
        <div>
          No Record Found
        </div>
      );
    }
    return (
      <div>
        <Link to={`/mc`}>&lt; Back</Link>
        <div key={this.state.chatLog.id} className="list-group">
          Case Number: {this.state.chatLog.caseNumber}<br />
          Priority: {this.state.chatLog.priority}<br />
          Last Message: {this.state.chatLog.lastMessage}<br />
          {moment(this.state.chatLog.timestamp).fromNow()}<br />
          <ChatMessageList messages={this.state.chatLog.chatLogs} />
        </div>
      </div>
    );
  }
};

MCChatDetail.propTypes = {
  params: PropTypes.shape({
    chatId: PropTypes.string.isRequired,
  }).isRequired,
};

export default MCChatDetail;
