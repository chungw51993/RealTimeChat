import React from 'react';
import ChatlistItem from './userlist-item.jsx';

const Chatlist = (props) => (
  <div>
    {
      props.messages.map((message, i) =>
        <div key={i}>{message.User.username}: {message.text}</div>
      )
    }
    <form onSubmit={props.handleNewMessage}>
      <input id="message" placeholder="Your Message Here" />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

Chatlist.propTypes = {

};

export default Chatlist;
