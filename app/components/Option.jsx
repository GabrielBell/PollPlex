var {connect} = require('react-redux');
var actions = require('actions');
var React= require('react');


export var Option = React.createClass({
	render: function(){
		var {dispatch,id,text} = this.props;
		
		return (
			<div>
				<input type="text" ref="optionText" value={text} placeholder="Sports Team" onChange={() => {
					
					var text = this.refs.optionText.value;
					dispatch(actions.updateOption(id, text));
				}}/>	

			</div>


		);
	}
});

export default connect((state) =>{
	return state;
})(Option)