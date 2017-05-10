var {connect} = require('react-redux');
var actions = require('actions');
var React= require('react');
import Option from 'Option';

export var OptionList = React.createClass({
	render: function(){
		var {dispatch,options} = this.props;
		var renderOptions = () => {
			if(options.length === 0){
				return (
					<p>Add an option.</p>
				)
			}else{
				return options.map((option) => {
					return <Option key={option.id} {...option}/>
				})
			}
		}
		return (
			<div>
				{renderOptions()}	

			</div>


		);
	}
});

export default connect((state) => {
	return state;
})(OptionList)