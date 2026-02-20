// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDDTxO7o0gZkmZDAB-jv7dIpdmeJX-WVx8',
	authDomain: 'tathva-ca.firebaseapp.com',
	databaseURL: 'https://tathva-ca-default-rtdb.firebaseio.com',
	projectId: 'tathva-ca',
	storageBucket: 'tathva-ca.appspot.com',
	messagingSenderId: '1001361890863',
	appId: '1:1001361890863:web:f612662db7f949101a70da',
	measurementId: 'G-B9QBQ9LLW6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

if (typeof window != 'undefined') getAnalytics(app)
