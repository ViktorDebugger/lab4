import { collection, addDoc } from "firebase/firestore";
import { db } from "./../js/firebase.js";
import dishes from "./../js/data.js";

export const uploadDishes = async () => {
  try {
    for (const dish of dishes) {
      await addDoc(collection(db, "dishes"), dish);
    }
  } catch (error) {
    console.error("Помилка завантаження даних: ", error);
  }
};

