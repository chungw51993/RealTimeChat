import React from 'react';
import UserlistItem from './userlist-item.jsx';

const Userlist = (props) => (
  <div>
    {
      props.users.map((user, i) =>
        <UserlistItem user={user} key={i}/>
      )
    }
  </div>
);

Userlist.propTypes = {

};

export default Userlist;
