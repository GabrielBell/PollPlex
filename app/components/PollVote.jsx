var React = require('react');
var actions = require('actions');
import * as Redux from 'react-redux';
import PollForm from 'PollForm';
import PollResults from 'PollResults';


export var PollVote = React.createClass({
	componentWillMount: function(){
		var {dispatch} = this.props;
		var {uid, pollID} = this.props.params;
		dispatch(actions.startFetchVote(uid, pollID));
	
	},
	render: function(){
		var {dispatch, vote, isFinished} = this.props;
		var {uid, pollID} = this.props.params;
		
		var renderChildren = () => {
			if(!isFinished) {
				return (
					<div>
						<PollForm authorId={uid} pollId={pollID}></PollForm>
					</div>
				);
			}else{
				return (
					<div>
						<PollResults></PollResults>
					</div>
				)
			}
		}
		var renderName = () => {
			if(vote === undefined){
				return (
						<div className="poll-question">
							<div></div>
						</div>
					);
			}else{
				return (
					<div className="vote-container">
						<div className="column large-4 poll-question">
							<h2>{vote.question}</h2>
							<p>by {vote.author}</p>
						</div>
						<div className="column large-8 poll-options">
							{renderChildren()}
						</div>
					</div>
				)
			}
		}


		return (
				<div className="row">
					{renderName()}
					

				</div>
			);
	}
});

export default Redux.connect((state) => {
	return {
		vote: state.vote.question,
		isFinished: state.vote.finished
	}
})(PollVote)