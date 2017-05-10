var React = require('react');
import * as Redux from 'react-redux';
var {Link, IndexLink, hashHistory} = require('react-router');
var actions = require('actions');

// When authenticated Nav should show username, Dashboard should show addpoll/mypolls
// when not authenticated Nav should show login/signup, dash should show signup
var Nav = React.createClass({

  render: function () {
    var {dispatch, firstName, isLoggedIn} = this.props;

    var Greeting = () => {
      if(isLoggedIn){
        return (
          <ul className="menu">
            <li>Hello {firstName}</li>
            <li>
              <Link to="#" onClick={(e) => {
                e.preventDefault();
                dispatch(actions.startLogout());
                
              }}>Logout</Link>
            </li>
          </ul>
        );
      }else{
        return (
          <ul className="menu">
            <li>
              <Link to="/signup" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Sign Up</Link>
            </li>
            <li>
              <Link to="/login" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</Link>
            </li>
          </ul>
        );
      }
    };

    return (
      <div>
        <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">PollPlex</li>
            <li>
              <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink>
            </li>
           </ul>
        </div>
        
        <div className="top-bar-right">
          {Greeting()}
        </div>

      </div>

      
    </div>
    );
  }
});

export default Redux.connect(
  (state) => {
    return {
      firstName: state.profile.name,
      isLoggedIn: state.auth.uid
    };
  }
)(Nav);