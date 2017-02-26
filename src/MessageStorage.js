
const privateMessages = {};

const MessageStorage = {
  get(room) {
    return privateMessages[room] || [];
  },

  set(room, data) {
    privateMessages[room] = data;
  },

  addMessage(room, data) {
    if (!privateMessages[room]) {
      privateMessages[room] = [];
    }
    privateMessages[room].push(data);
  },
};

module.exports = MessageStorage;
