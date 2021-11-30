import {db} from '../firebaseConfig'
import { getDoc, setDoc, updateDoc, doc } from 'firebase/firestore'

const INITIAL_RATING = 1000;   
const collectionName = 'users';

export const createUser = async (id, email) => {
    await setDoc(doc(db, collectionName, id), {
        email: email,
        rating: INITIAL_RATING,
    });
}

export const updateRating = async (id, rating) => {
    const userDoc = doc(db, collectionName, id);
    await updateDoc(userDoc, {rating: rating}); 
}

export const getRating = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return docSnap.data().rating;
    } else {
        console.log("err (no such doc)");
    }
}
