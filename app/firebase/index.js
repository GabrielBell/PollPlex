import firebase from 'firebase';

try {
	var config = {
	    apiKey: process.env.API_KEY,
	    authDomain: process.env.AUTH_DOMAIN,
	    databaseURL: process.env.DATABASE_URL,
	    projectId: process.env.PROJECT_ID,
	    storageBucket: process.env.STORAGE_BUCKET,
	    
  	};
  firebase.initializeApp(config);
} catch (e) {
	console.log('Oops firebase unable to connect', e);
}

export var emailProvider = new firebase.auth.EmailAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;