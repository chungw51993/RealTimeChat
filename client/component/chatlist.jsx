import React from 'react';
import ChatlistItem from './userlist-item.jsx';

const Chatlist = (props) => (
  <div>
    <div className="chatwindow">
    {
      props.messages.map((message, i) =>
        <div key={i}>{message.User.username}: {message.text}</div>
      )
    }
    </div>
    <form id="messageForm" className="messageForm" onSubmit={props.handleNewMessage}>
      <input className="message" id="message" placeholder="Your Message Here" />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

Chatlist.propTypes = {

};

export default Chatlist;
