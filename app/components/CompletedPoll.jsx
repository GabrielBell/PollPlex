var React = require('react');
var actions = require('actions');
import * as Redux from 'react-redux';
var {Link, IndexLink} = require('react-router');

export var CompletedPoll = React.createClass({
	render: function(){
		var {dispatch, firstName, pollId, uid} = this.props;
				
		return (
				<div className="completed-poll">
					<h4>Congratulations {firstName}!</h4>
					<p>Your polls has been posted to</p>
					<Link to={`users/${uid}/${pollId}`}>Your new Poll.</Link>
				</div>
			);
	}
});

export default Redux.connect((state) => {
	return {
		firstName: state.auth.name,
		pollId: state.completed.id,
		uid: state.completed.uid
	}
}
)(CompletedPoll)