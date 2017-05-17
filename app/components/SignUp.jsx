import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';


export var SignUp  = React.createClass({
	onSignUp: function() {
		var {dispatch} = this.props;
		var name= this.refs.name.value;
		var email= this.refs.email.value;
		var password= this.refs.password.value;

		dispatch(actions.handleSignUp(name, email, password));
	},
	render: function() {
		return (
			<div>
				<div className="row">
					<div className="columns small-centered small-10 medium-6 large-4">
						<p>Name</p>
						<input type="text" ref="name"/>
						<p>Email</p>
						<input type="text" ref="email"/>
						<p>Password</p>
						<input type="password" ref="password"/>
						<button className="button" onClick={this.onSignUp}>SignUp</button>

	
					</div>
		
				</div>
			</div>



		);
	}
})

export default Redux.connect()(SignUp);