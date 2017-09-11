import React from 'react';

const ChatlistItem = (props) => (
  <div>
    <div>{props.message.text}</div>
  </div>
);

ChatlistItem.propTypes = {

};

export default ChatlistItem;
