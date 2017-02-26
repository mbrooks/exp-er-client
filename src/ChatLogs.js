import config from '../config/config';
import mbRequest from './mbRequest';

const ChatLogs = {
  getAll() {
    const options = {
      url: `${config.api.url}/chatLogs`,
    };

    return mbRequest.get(options);
  },
};

module.exports = ChatLogs;
