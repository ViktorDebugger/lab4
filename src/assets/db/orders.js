import { db } from "./../js/firebase.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const addOrderToFirestore = async (userId, order) => {
  try {
    const ordersRef = collection(db, "orders");
    await addDoc(ordersRef, {
      userId,
      ...order,
    });
  } catch (error) {
    console.error("Помилка при додаванні замовлення до Firestore:", error);
  }
};

export const loadOrdersFromFirestore = async (userId) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map((doc) => doc.data());
    return orders;
  } catch (error) {
    console.error("Помилка при завантаженні замовлень з Firestore:", error);
    return [];
  }
};
