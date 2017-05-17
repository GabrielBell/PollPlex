import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';


export var Login  = React.createClass({
	onLogin: function() {
		
		var {dispatch} = this.props;
		var email = this.refs.email.value;
		var password = this.refs.password.value;
		this.refs.email='';
		this.refs.password='';
		
		dispatch(actions.handleLogin(email, password));
	},
	render: function() {
		return (
			<div>
				<div className="row">
					<div className="columns small-centered small-10 medium-6 large-4">
						
						<p>Email</p>
						<input type="text" ref="email"/>
						<p>Password</p>
						<input type="password" ref="password"/>
						<button className="button" onClick={this.onLogin}>Login</button>

	
					</div>
		
				</div>
			</div>



		);
	}
})

export default Redux.connect()(Login);