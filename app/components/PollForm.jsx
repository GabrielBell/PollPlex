var {connect} = require('react-redux');
var actions = require('actions');
var React= require('react');


export var PollForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var {dispatch, getState, selectedOption, authorId, pollId} = this.props;
		console.log('pollID: ', pollId, ' and authorId are set: ', authorId );

		dispatch(actions.startIncrementVote(selectedOption, authorId, pollId));
	},
	render: function(){
		var {dispatch, vote, selectedOption} = this.props;
		var renderOptions = () => {
			if(vote) {
				return vote.options.map((option) => {
					return (
						<div className="radio" key={option.id}>
							<label>
								<input type="radio" value={option.text} key={option.id}
								checked={selectedOption === option.id} onChange={(event) => {
										dispatch(actions.updateVoteOption(option.id));
									}}
								/>
								{option.text}
							</label>

						</div>
						
						
						)
				})
			}
		};
		return (
			<div className="poll-form-container">
				<form onSubmit={this.handleSubmit} className="poll-form">
					{renderOptions()}
					<button className="button">Vote!</button>
				</form>

			</div>


		);
	}
});

export default connect((state) =>{
	return {
		vote: state.vote.question,
		selectedOption: state.vote.answer
	}
})(PollForm)