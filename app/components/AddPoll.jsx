var React = require('react');
var actions = require('actions');
var {connect} = require('react-redux');
// conditionally render AddPoll, PollList, Poll (PollQuestion, PollResults) 
import Option from 'Option'
import OptionList from 'OptionList'


export var AddPoll = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var {dispatch, options} = this.props;
		var name = this.refs.pollName.value;
		dispatch(actions.addNewPoll(name, options));
	
	},
	render: function(){
		var {dispatch, options} = this.props;
	    return (
			<div className="row">
				<div className="column small-centered small-11 medium-6 large-5">
					<div className="new-poll-container">

						<h2>New Poll</h2>
						<p>Name your poll.</p>
						
						<form ref="form" className="poll-form" onSubmit={this.handleSubmit} >
							<input type="text" ref="pollName" placeholder="What is your favorite sports team?"/>
							<div className="options-container">
								<p>Options</p>
								<OptionList/>
						
							</div>
					
							<div className="buttons-container">
								<ul className="stack button-group">
									<li><button className="button expanded hollow" onClick={(e) => {
										e.preventDefault();
										dispatch(actions.createNewOption(options.length))
									}} >More Options</button></li>
									<li><button className="button expanded">Submit</button></li>
		
								</ul>
							</div>
						</form>
					</div>
				</div>
			</div>
			
		);
  	}

}); 
  
  


export default connect(
	(state) => {
		return {
			options: state.options
			
		}
	}
)(AddPoll);