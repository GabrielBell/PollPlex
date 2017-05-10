var React = require('react');
import * as Redux from 'react-redux';
import AddPoll from 'AddPoll';
import Home from 'Home';
// conditionally render Home || AddPoll || PollList   

var PollApp = React.createClass({
  render: function(){
  	var {firstName, isLoggedIn} = this.props;
  	var renderPolls = () => {
  		if(!isLoggedIn){
  			return <Home></Home>
  		}else{
  			return <AddPoll></AddPoll>
  		}
  	}
    return (
      <div>
        {renderPolls()}
      </div>



    );
  }
}); 
  
  


export default Redux.connect(
	(state) => {
		return {
			firstName: state.profile.name,
      isLoggedIn: state.auth.uid
		}
	}
)(PollApp);



