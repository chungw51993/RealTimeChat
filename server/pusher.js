var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '398003',
  key: '4600601226fca311289b',
  secret: 'a2d5f722685e10c17c87',
  cluster: 'us2',
  encrypted: true
});

module.exports = pusher;