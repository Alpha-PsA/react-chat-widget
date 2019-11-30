import React, { Component } from 'react';
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, renderCustomComponent } from '../index';
import logo from './logo.svg';

export default class App extends Component {
  componentDidMount() {
    addResponseMessage('Hi，Im Evi！');
  }

  handleNewUserMessage = (newMessage) => {
    const pics = ['https://s2.ax1x.com/2019/11/14/MN0j3D.jpg', 'https://s2.ax1x.com/2019/11/14/MNviCt.jpg']
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    const responseList = ['你好，腾达，请稍后~~~', '好的', 'Ok', 'Thank you!!!', '这样可以么？ 腾达']
    const response = responseList[Math.floor(Math.random() * responseList.length)]
    console.log(Math.random() * responseList.length)
    this.postRequest(newMessage)
  }

  postRequest = (newMessage) => {
    const url = '/send/chat/'
    const body = {
      "userName":"liwanru",
      "question":newMessage
     }
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Jdcloud-Session': '383b8142-06db-11ea-a56d-002315d34fae'
      },
      body: JSON.stringify(body)
    };
    fetch(url, settings)
     .then(resp => resp.json())
     .then(json => {
      addResponseMessage(json.result.answer);
     })
  }

  render() {
    return (
      <Widget
        title="Bienvenido"
        subtitle="Asistente virtual"
        senderPlaceHolder="输入 ..."
        handleNewUserMessage={this.handleNewUserMessage}
        badge={1}
        profileAvatar={logo}
      />
    );
  }
}
