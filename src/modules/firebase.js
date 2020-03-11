import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
	apiKey: 'AIzaSyD9nqvCNJ8N7Ld2GH9YJryVk8TmVMdz1NY',
	authDomain: 'practice-18e06.firebaseapp.com',
	databaseURL: 'https://practice-18e06.firebaseio.com',
	projectId: 'practice-18e06',
	storageBucket: 'practice-18e06.appspot.com',
	messagingSenderId: '126027973717',
	appId: '1:126027973717:web:35dfc4c65ae9fe404800dc'
}

firebase.initializeApp(config)

const auth = firebase.auth()
const db = firebase.firestore()

export { db, auth }
