import firebase, {firebaseRef, emailProvider} from 'app/firebase/';



export var login = (uid, name) => {
	return {
		type: 'LOGIN',
		uid,
		name		
	}
};

export var logout = () => {
	return {
		type: 'LOGOUT'
	}
};

export var startLogin = (uid) => {
	return (dispatch, getState) => {
		firebaseRef.child(`users/${uid}/name`).once('value').then((snapshot) => {
				dispatch(login(uid, snapshot.val()));
		});
	}
};

export var handleSignUp = (name, email, password) => {
	
	return (dispatch, getState) => {
		return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
			firebaseRef.child(`users/${result.uid}`).set({
				name: name,
				provider: {
					email: result.providerData[0].email,
					providerID: result.providerData[0].providerId,
				}
				
			}).then(() => {
				console.log('Succesfully created new user', name)
			})
		}, (error) => {
			console.log('Unable to Sign Up', error)
		})
	}
};

export var handleLogin = (email, password) => {
	return (dispatch, getState) => {
		return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
			console.log('Login worked!', result);
			

		}, (error) => {
			console.log('Unable to authenticate', error);
		});
	};
};

export var handleLogout = () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut().then(() => {
			console.log('Succesfull log out');
			
		})
	}
};

export var toggleCompleted = (nav, id, uid) => {
	return {
		type: 'TOGGLE_COMPLETED',
		nav,
		id,
		uid
	};
};

export var startRemovePoll = (pollId) => {
	return (dispatch, getState) => {
		var uid = firebase.auth().currentUser.uid;
		
		var pollRef = firebaseRef.child(`users/${uid}/polls/${pollId}`);
		return pollRef.remove().then(() => {
			
			var newPolls = getState().polls.filter((poll) => {
				return !(poll.id === pollId)
			});
			dispatch(setPolls(newPolls));
			
		})
	};
};

export var setPolls = (polls) => {
	return {
		type: 'SET_POLLS',
		polls

	};
}

export var startAddPolls = (uid) => {
	return (dispatch, getState) => {
		
		var pollsRef = firebaseRef.child(`users/${uid}/polls`);

		return pollsRef.once('value').then((snapshot) => {
			
			var polls = snapshot.val() || {};
			var parsedPolls = [];

			Object.keys(polls).forEach((pollId) => {
				parsedPolls.push({
					id: pollId,
					...polls[pollId]
				});
			});
			
			dispatch(setPolls(parsedPolls));
		})
	}
}

export var addPoll = (poll) => {
	return {
		type: 'ADD_POLL',
		poll

	};
}

export var startAddNewPoll = (question, options) => {
	return (dispatch, getState) => {
		
		var author= getState().auth.name;
		var poll = {
			question,
			options,
			author
		};
		var uid = firebase.auth().currentUser.uid;
		var pollRef = firebaseRef.child(`users/${uid}/polls`).push(poll);
		
		return pollRef.then(() => {
			dispatch(addPoll({
				...poll,
				id: pollRef.key
			}));

			dispatch(toggleCompleted('completed', pollRef.key, uid));
			dispatch(resetOptions());
		});
	};
};



export var incrementVote = (update,id) => {
	return {
		type: 'INCREMENT_VOTE',
		update,
		id
	}
};

export var startIncrementVote = (aid, uid, pid) => {
	return (dispatch, getState) => {
		
		var update = getState().vote.question.options.map((option) => {
			if(option.id === aid) {
				
				return {...option, votes: option.votes+1};
			}
			return option;
		})
		var pollRef = firebaseRef.child(`users/${uid}/polls/${pid}/options/${aid}`);
		return pollRef.update(update[aid]).then(() => {
			
			dispatch(incrementVote(update, aid))
		})
		
	}
}

export var updateVoteOption = (id) => {
	return {
		type: 'UPDATE_VOTE_OPTION',
		id
	}
}

export var fetchVote = (vote) => {
	return {
				type: 'FETCH_VOTE',
				vote

			}
};

export var startFetchVote = (uid, pid) => {
	return (dispatch, getState) => {
		var pollRef = firebaseRef.child(`users/${uid}/polls/${pid}`);

		return pollRef.once('value').then((snapshot) => {
			var poll = snapshot.val() || {};
			
			dispatch(fetchVote(poll));
			
		})
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


export var resetOptions = () => {
	
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







