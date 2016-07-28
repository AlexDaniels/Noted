var newBoardButton = $('#'+'newboardbtn');

newBoardButton.on('click', function(){
  window.location='/newboard'
})

var homeButton = $('#'+'homebtn');

homeButton.on('click', function(){
  window.location='/home'
})

'use strict';

var Logout = React.createClass({
  displayName: 'Logout',

  logout: function logout() {
    var path = '/security/logout';
    var next = function next(val) {
      if (val.result === true) {
        window.location = '/';
      }
    };
    var options = {
      methodType: 'POST',
      path: path,
      next: next
    };
    sendMessage(options);
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'a',
        { onClick: this.logout },
        'Logout'
      )
    );
  }
});

ReactDOM.render(React.createElement(Logout, null), document.getElementById('logout'));