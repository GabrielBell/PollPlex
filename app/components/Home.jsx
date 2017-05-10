import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';


export var Home  = React.createClass({
	render: function() {
		return (
			<div className="container-home">
				<div className="row">
					<div className="columns large-4">
						<div className="custom-panel">
							
							<h2 className="subtitle">Live Results</h2>
							<p>See live visualizations of your polls in real-time.</p>
						</div>
					</div>
					<div className="columns large-4">
						<div className="custom-panel">
							
							<h2 className="subtitle">Works Everywhere</h2>
							<p>Responsive design means fluid user experience regardless of platform.</p>
						</div>
					</div>
					<div className="columns large-4">
						<div className="custom-panel">
							
							<h2 className="subtitle">Social Integration</h2>
							<p>Login using your social media platform of choice and allow comments on polls.</p>
						</div>
					</div>
			
				</div>
			</div>



		);
	}
})

export default Redux.connect()(Home);