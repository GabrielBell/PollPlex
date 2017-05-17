var {connect} = require('react-redux');
var actions = require('actions');
var React= require('react');
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

export var PollResults = React.createClass({
	componentWillMount: function(){
		var {dispatch, uid, pollId} = this.props;
		dispatch(actions.startFetchVote(uid, pollId));
		this.state = {
			width: '500',
			height: '250',
			data: null,
			options: { animation: false },
			title: ''
		};

		this._chart = null;
	},	
	render: function(){
		var {dispatch, vote, selectedOption} = this.props;
		var {width, height, title} = this.state;
		var style = {width, height};

		var renderResults = () => {	return vote.options.map((option) => {});	};
		return (
			<div className="poll-results-container" ref="container">
				<h1>{title}</h1>
				<div className="chart-wrapper" ref="chartWrapper">
					<canvas ref="canvas" width={width} height={height} style={style} />
				</div>
				
			</div>


		);
	},
	componentDidMount: function(){
		var {vote} = this.props;
		console.log('options in PollResults',vote.options);
		this.setState({
			data: {
				labels: vote.options.map((option) => { return option.text }),
				datasets: [{
					label: '# of votes',
					data: vote.options.map((option) => { return option.votes})
				}]
			},
			options: {
				animation: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			},
			title: vote.question.question
		});

		(window.onresize = () => {
			var wrapper = ReactDOM.findDOMNode(this.refs.chartWrapper);
			var width = wrapper.clientWidth;
			var height = wrapper.clientHeight;

			if(this._chart) {
				this._chart.chart.width = width;
				this._chart.chart.height = height;
			}

			this.setState({ width, height });
		})();
	},
	componentDidUpdate: function(){
		if (this._chart) this._chart.destroy();
		var ctx = this.refs.canvas.getDOMNode().getContext("2d");
		this._chart = new Chart(ctx, {type: 'bar', data: this.state.data, options: this.state.options});
	}

});

export default connect((state) =>{
	return {
		vote: state.vote.question,
		uid: state.auth.uid,
		pollId: state.completed.id
	}
})(PollResults)