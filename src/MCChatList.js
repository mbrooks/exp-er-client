import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';
import MCChatDetail from './MCChatDetail';

function doInfiniteLoad() {

}

const MCChatList = ({ chatLogs }) => (
  <div>
    {chatLogs.map(chatLog => (
      <div key={chatLog.id} className="list-group">
        Case Number: {chatLog.caseNumber}<br />
        Priority: {chatLog.priority}<br />
        Last Message: {chatLog.lastMessage}<br />
        {moment(chatLog.timestamp).fromNow()}<br />
        <Link to={`/mc/chat-detail/${chatLog.id}`}>View</Link>
      </div>
    ))}
  </div>
);

MCChatList.propTypes = {
  chatLogs: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    caseNumber: PropTypes.number.isRequired,
    priority: PropTypes.string.isRequired,
    lastMessage: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  })).isRequired,
};

export default MCChatList;
