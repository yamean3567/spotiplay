import {db} from '../firebaseConfig'
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'

const INITIAL_RATING = 1000;   
const collectionName = 'users';
const usersCollectionRef = collection(db, collectionName);

export const createUser = async (id, email) => {
    await addDoc(usersCollectionRef, {
        email: email,
        rating: INITIAL_RATING,
        id: id,
    });
}

export const updateRating = async (id, rating) => {
    const userDoc = doc(db, collectionName, "de50pbrWvPrJPzWI0jeR");
    await updateDoc(userDoc, {rating: rating}); 
}

export const getRating = async (id) => {
    return await getDocs().docs.filter(uid => id === uid);
}
