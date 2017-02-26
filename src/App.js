import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import './App.css';
import ChatContainer from './ChatContainer';
import MissionControl from './MissionControl';
import MCChatDetail from './MCChatDetail';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={ChatContainer} />
        <Route path="/mc" component={MissionControl} />
        <Route path="/mc/chat-detail/:chatId" component={MCChatDetail} />
      </Router>
    );
  }
}

export default App;
