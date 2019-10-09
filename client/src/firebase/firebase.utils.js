// jshint esversion:8
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { socket } from '../assets/socketIO/socketIO.utils';
import { updatePlayerName } from '../redux/players/player.action';

const config = {
    apiKey: "AIzaSyCeYvh5XuIvP4OScCZCrNDl_412lNtMO7s",
    authDomain: "crown-db-de817.firebaseapp.com",
    databaseURL: "https://crown-db-de817.firebaseio.com",
    projectId: "crown-db-de817",
    storageBucket: "",
    messagingSenderId: "874302249230",
    appId: "1:874302249230:web:25b1aed13844e7fd"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    } else {
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        // create new user profile
        if (!snapShot.exists) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();
            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            } catch (error) {
                console.log('error creating user:', error.message);
            }
        }
        return userRef;
    }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const convertCollectionsSnapShotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return ({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        });
        });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
    socket.emit('playerLogin', socket.id);
    // socket.on('successfulLogin', function(id) {
    //     console.log('hi');
    //     // if (socket.id === id) {
    //     //    auth.onAuthStateChanged(async userAuth => {
    //     //       if (userAuth) {
    //     //         // userAuth represents a signed-in user so set that to current user
    //     //         const userRef = await createUserProfileDocument(userAuth);
        
    //     //         userRef.onSnapshot(snapShot => {
    //     //           updatePlayerName(socket.id, snapShot.displayName.slice(0,10));
    //     //           socket.broadcast.emit('updateDisplayName', [socket.id, snapShot.displayName.slice(0,10)]);
    //     //         });
    //     //       } 
    //     //     });
    //     // }
    // });
    auth.signInWithPopup(provider);
    // socket.emit('successfulLogin', socket.id);
};

export default firebase;