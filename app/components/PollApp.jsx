var React = require('react');
import * as Redux from 'react-redux';
import AddPoll from 'AddPoll';
import Home from 'Home';
import CompletedPoll from 'CompletedPoll';
import PollList from 'PollList';
import PollResults from 'PollResults';
// conditionally render Home || AddPoll || PollList   

var PollApp = React.createClass({
  render: function(){
  	var {firstName, isLoggedIn, navState} = this.props;
  	var renderPolls = () => {
  		if(isLoggedIn && navState === 'list'){
  			return <PollList></PollList>
      }else if(isLoggedIn && navState === 'completed'){
        return <CompletedPoll></CompletedPoll>
  		}else if (isLoggedIn && navState === 'new') {
  			return <AddPoll></AddPoll>
  		}else if (isLoggedIn && navState === 'results'){
        return <PollResults></PollResults>
      }else{
        return <Home></Home>
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
			firstName: state.auth.name,
      isLoggedIn: state.auth.uid,
      navState: state.completed.navState
		}
	}
)(PollApp);



