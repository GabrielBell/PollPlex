var React = require('react');
import * as Redux from 'react-redux';
var {Link, IndexLink} = require('react-router');
var actions = require('actions');
// When authenticated Nav should show username, Dashboard should show addpoll/mypolls
// when not authenticated Nav should show login/signup, dash should show signup
var Dashboard = React.createClass({

  render: function () {
    var {dispatch, isLoggedIn} = this.props;
    var renderButtons = () => {
      if(isLoggedIn){
        return (
          <span>
            <Link to="/" className="button" onClick={(e) => {
              
              dispatch(actions.toggleCompleted('new', -1, -1));
            }}>New Poll</Link>
            <Link to="/" className="button" onClick={(e) => {
              
              dispatch(actions.toggleCompleted('list', -1, -1));
            }}>My Polls</Link>
          </span>
        );
      }else{
        return (
          <span>
            <Link to="/signup" className="button success">Sign Up</Link>
            
          </span>
          )
      }
    };

    var renderText = () => {
      if(isLoggedIn){
        return (
          <div>
            <h1>Dashboard</h1>
            <h5>What would you like to do today?</h5>
          </div>
          );
      }else{
        return (
          <div>
            <h1>PollPlex</h1>
            <h5>Create custom polls with live results.</h5> 
          </div>
          );
      }
    };

    return (
     
      <div className="hero-section">
        <div className="hero-section-text">
          {renderText()}
          
        </div>

        <div className="hero-section-buttons">
          {renderButtons()}
            
          
        </div>
      </div>
    
    );
  }
});

export default Redux.connect(
  (state) => {
    return {
      isLoggedIn: state.auth.uid
      
    }
  }
)(Dashboard);
