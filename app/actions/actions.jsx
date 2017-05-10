import firebase, {firebaseRef, emailProvider} from 'app/firebase/';



export var login = (uid) => {
	return {
		type: 'LOGIN',
		uid		
	}
};

export var logout = () => {
	return {
		type: 'LOGOUT'
	}
};

export var setName = (name) => {
	return {
		type: 'SET_NAME',
		name
	}
}

export var clearName = () => {
	return {
		type: 'CLEAR_NAME'
	}
}

export var startSignUp = (name, email, password) => {
	
	return (dispatch, getState) => {
		return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
			firebaseRef.child(`users/${result.uid}`).set({
				name: name,
				provider: {
					email: result.providerData[0].email,
					providerID: result.providerData[0].providerId,
				}
				
			}).then(() => {
				console.log('New user created, storing name in Redux', name)
				dispatch(setName( name));
			})
		}, (error) => {
			console.log('Unable to Sign Up', error)
		})
	}
};

export var startLogin = (email, password) => {
	return (dispatch, getState) => {
		return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
			console.log('Login worked!', result);
			firebaseRef.child(`users/${result.uid}/name`).once('value').then((snapshot) => {
				dispatch(setName(snapshot.val()));
			});

		}, (error) => {
			console.log('Unable to authenticate', error);
		});
	};
};

export var startLogout = () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut().then(() => {
			console.log('Succesfull log out');
			dispatch(clearName());
		})
	}
};





export var addNewPoll = (name, options) => {
	var poll = {
		name,
		options
	}
	return {
		type: 'ADD_POLL',
		poll

	}
};

export var createNewOption = (id) => {
	var option = {
		id,
		text: '',
		votes: 0
	}
	return {
		type: 'ADD_OPTION',
		option
	}
};


export var addOptions = () => {
	
	var options = [
		{
			id: 0,
			text: '',
			votes: 0	
		},
		{
			id: 1,
			text: '',
			votes: 0
		}
	];

	return {
		type: 'ADD_OPTIONS',
		options
	}
};

export var updateOption = (id, text) => {
	
	
	return {
		type: 'UPDATE_OPTION',
		id,
		text
	}
};





