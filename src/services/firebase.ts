import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAM5BTTHMuVfOFXJcr28TiInL4kgt6j9yc',
	authDomain: 'work-days-32676.firebaseapp.com',
	projectId: 'work-days-32676',
	storageBucket: 'work-days-32676.appspot.com',
	messagingSenderId: '25856752246',
	appId: '1:25856752246:web:b1b591eb5b595c449bfd57',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
