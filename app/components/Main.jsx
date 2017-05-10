// Main should render Navbar and dashboard thingy for every page.
var React = require('react');
import * as Redux from 'react-redux';
import Nav from 'Nav';
import Dashboard from 'Dashboard';

var Main = React.createClass({
	render: function() {
		return (
		    <div>
			    <Nav/>
				<Dashboard/>
			    {this.props.children}
		    </div>
	  	);
	}
  
}); 

export default Redux.connect()(Main);