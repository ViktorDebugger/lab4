import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./../js/firebase.js";

export const saveBasketToFirestore = async (userId, basket) => {
  try {
    await setDoc(doc(db, "baskets", userId), { basket });
  } catch (error) {
    console.error("Помилка збереження корзини: ", error);
  }
};

export const loadBasketFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, "baskets", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().basket;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Помилка завантаження корзини: ", error);
    return [];
  }
};
