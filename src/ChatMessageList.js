import React, { PropTypes } from 'react';
import moment from 'moment';
import ReactChatview from 'react-chatview';

const styles = {
  chatArea: {
    width: '100%',
    padding: '10px',
  },
  messageBox: {
    border: '1px solid #ddd',
    borderRadius: '3px',
    padding: '10px',
    marginRight: '10px',
    width: 'auto',
  },
};

function doInfiniteLoad() {

}

const ChatMessageList = ({ messages }) => (
  <ReactChatview onInfiniteLoad={ doInfiniteLoad }>
    {messages.map(message => (
      <div key={message.id} style={styles.chatArea}>
        <div style={styles.messageBox}>
          {message.message}<br />{moment(message.timestamp).fromNow()}
        </div>
      </div>
    ))}
  </ReactChatview>
);

ChatMessageList.propTypes = {
  messages: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  })).isRequired,
};

export default ChatMessageList;
