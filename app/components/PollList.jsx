var {connect} = require('react-redux');
var actions = require('actions');
var React= require('react');


export var PollList = React.createClass({
	render: function(){
		var {dispatch,polls, uid} = this.props;
		var renderPolls = () => {
			return 	polls.map((poll) => {
				return(	
					<div className="poll-container" key={poll.id}>
						
							<label>{poll.question}</label>
							<button className="button delete-button secondary" onClick={(e) => {
								e.preventDefault();
								dispatch(actions.startRemovePoll(poll.id));
							}}>Delete
							</button>
							<button className="button delete-button" onClick={(e) => {
								e.preventDefault();
								
								dispatch(actions.toggleCompleted('results',poll.id, uid));
							}}>View Poll
							</button>
						
							

						
					</div>
					);
			
			});
		
			
		}
		return (
			<div className="poll-list-container">
				{renderPolls()}	

			</div>


		);
	}
});

export default connect((state) => {
	return {
		uid: state.auth.uid,
		polls: state.polls
	}
})(PollList)