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
        <strong>Case Number:</strong> {chatLog.caseNumber}<br />
        <strong>Priority:</strong> {chatLog.priority}<br />
        <strong>Last Message:</strong> {chatLog.lastMessage}<br />
        <strong>logitude:</strong> {chatLog.longitude}<br />
        <strong>latitude:</strong> {chatLog.latitude}<br />

        {moment(chatLog.timestamp).fromNow()}<br />
      <Button href={`/#/mc/chat-detail/${chatLog.id}`} bsSize="small" >View</Button>
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
    longitude: PropTypes.number,
    latitude: PropTypes.numbers,
  })).isRequired,
};

export default MCChatList;
