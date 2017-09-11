import React from 'react';

const Roomlist = (props) => (
  <div>
    <div>Current Room: {props.room}</div>
    <div>
    Change Room: <select defaultValue="1" onChange={props.handleRoomChange}>
      <option disabled value="1">Change Room</option>
      {props.rooms.map(room =>
        <option value={room.name} key={room.id}>{room.name}</option>
      )
      }
      <option value="newRoom">Create Room</option>
    </select>
    </div>
  </div>
);

Roomlist.propTypes = {
  rooms: React.PropTypes.array.isRequired
};

export default Roomlist;
