import {db} from '../firebaseConfig'
import { getDoc, setDoc, updateDoc, doc, collection, orderBy, limit, getDocs, query } from 'firebase/firestore'

const INITIAL_RATING = 0;   
const collectionName = 'users';

export const createUser = async (id, email) => {
    await setDoc(doc(db, collectionName, id), {
        email: email,
        HLScore: INITIAL_RATING,
        LGScore: INITIAL_RATING,
    });
}

export const updateRating = async (id, rating) => {
    const userDoc = doc(db, collectionName, id);
    await updateDoc(userDoc, {rating: rating}); 
}

export const getRating = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    if(docSnap.exists()) {
        return docSnap.data().rating;
    } else {
        console.log("err (no such doc)");
    }
}

export const getTopHLScore = async (lim) => {
    const q = query(collection(db, "users"), orderBy("HLScore", "desc"), limit(lim));
    const docQuery = await getDocs(q);
    return docQuery;
}

export const getTopLGScore = async (lim) => {
    const q = query(collection(db, "users"), orderBy("LGScore", "desc"), limit(lim));
    const docQuery = await getDocs(q);
    return docQuery;
}
