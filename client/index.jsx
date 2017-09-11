import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import AuthPanel from './component/authpanel.jsx';
import Userlist from './component/userlist.jsx';
import Chatlist from './component/chatlist.jsx';
import Roomlist from './component/roomlist.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      users: [],
      messages: [],
      rooms: [],
      room: 'Lobby',
      newRoom: false,
      user: {}
    };
  }

  componentWillMount() {
    this.pusher = new Pusher('4600601226fca311289b', {
      cluster: 'us2',
      encrypted: true
    });
    this.chatRoom = this.pusher.subscribe(this.state.room);
  }

  componentDidMount() {
    this.pusherListener();
  }

  pusherListener() {
    this.chatRoom.bind('new_user', (user) => {
      let users;
      if (this.state.loggedIn) {
        if (this.state.users.length) {
          const filtered = user.user.filter((user) => {
            if (user !== this.state.user) {
              return user;
            }
          });
          users = this.state.users.concat(filtered);
        } else {
          users = this.state.users.concat(user.user);
        }
        this.setState({
          users: users
        });
      }
    }, this);

    this.chatRoom.bind('new_message', (message) => {
      console.log('hello');
      this.getRoomlistMessages();
    }, this);

    this.chatRoom.bind('new_room', (room) => {
      let rooms;
      if (this.state.rooms[this.state.rooms.length - 2] !== room) {
        rooms = this.state.rooms.concat(room);
        this.setState({
          rooms: rooms
        });
      }
    }, this);
  }

  getRoomlistMessages() {
    axios.get('/api/room')
      .then((dataOne) => {
        axios.get(`/api/message/${this.state.room}`)
          .then((dataTwo) => {
            this.setState({
              rooms: dataOne.data,
              messages: dataTwo.data.Messages
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleLogin(e) {
    axios.post('/api/user/login', {
      username: e.target.username.value,
      password: e.target.password.value
    })
      .then((data) => {
        this.setState({
          user: data.data,
          loggedIn: true
        });
        this.getRoomlistMessages();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleSignup(e) {
    axios.post('/api/user/signup', {
      username: e.target.username.value,
      password: e.target.password.value
    })
      .then((data) => {
        this.setState({
          user: data.data,
          loggedIn: true
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleRoomChange(e) {
    if (e.target.value === 'newRoom') {
      this.setState({
        newRoom: true
      });
    } else {
      this.pusher.unsubscribe(this.state.room);
      this.setState({
        room: e.target.value
      });
      this.chatRoom = this.pusher.subscribe(this.state.room);
      this.getRoomlistMessages();
    }
  }

  newRoom(e) {
    e.preventDefault();
    axios.post('/api/room', {
      name: e.target.name.value
    })
      .then((data) => {
        const rooms = this.state.rooms.concat(data.data);
        this.setState({
          newRoom: false,
          room: data.data.name,
          rooms: rooms
        });
        this.getRoomlistMessages();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  newMessage(e) {
    e.preventDefault();
    axios.post(`/api/message/${this.state.room}`, {
      text: e.target.message.value
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const authorized = () => {
      if (!this.state.loggedIn) {
        return (<AuthPanel login={this.handleLogin.bind(this)} signup={this.handleSignup.bind(this)} />);
      } else {
        return (<Roomlist rooms={this.state.rooms} room={this.state.room} handleRoomChange={this.handleRoomChange.bind(this)}/>);
      }
    };

    const popup = () => {
      if (this.state.newRoom) {
        return (
          <div className="popup">
            <div className="card">
              <div className="heading">New Room</div>
              <form onSubmit={this.newRoom.bind(this)}>
                <input className="newRoom" id="name"/>
                <input type="submit" value="Submit"/>
              </form>
            </div>
          </div>
        );
      }
    };

    return (
      <div>
        { authorized() }
        <h3>Users Online</h3>
        <Userlist users={this.state.users} />
        <h3>Chat</h3>
        <Chatlist messages={this.state.messages} handleNewMessage={this.newMessage.bind(this)} />
        { popup() }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));