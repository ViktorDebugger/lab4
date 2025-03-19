import { db } from "./../js/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const addOrderToFirestore = async (userId, order) => {
  try {
    const ordersRef = collection(db, "orders");
    const userOrdersQuery = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(userOrdersQuery);

    if (querySnapshot.empty) {
      await addDoc(ordersRef, {
        userId,
        orders: [
          {
            orderId: 1,
            ...order,
          },
        ],
      });
    } else {
      const userOrderDoc = querySnapshot.docs[0];
      const currentOrders = userOrderDoc.data().orders || [];
      const newOrderId = currentOrders.length + 1;

      await updateDoc(userOrderDoc.ref, {
        orders: [
          ...currentOrders,
          {
            orderId: newOrderId,
            ...order,
          },
        ],
      });
    }
  } catch (error) {
    console.error("Помилка при додаванні замовлення до Firestore:", error);
  }
};

export const deleteOrderFromFirestore = async (userId, orderId) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userOrderDoc = querySnapshot.docs[0];
      const currentOrders = userOrderDoc.data().orders || [];

      const updatedOrders = currentOrders.filter(
        (order) => order.orderId !== orderId
      );

      await updateDoc(userOrderDoc.ref, {
        orders: updatedOrders,
      });
    }
  } catch (error) {
    console.error("Помилка при видаленні замовлення з Firestore:", error);
  }
};

export const loadOrdersFromFirestore = async (userId) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userOrderDoc = querySnapshot.docs[0];
      return userOrderDoc.data().orders || [];
    }
    return [];
  } catch (error) {
    console.error("Помилка при завантаженні замовлень з Firestore:", error);
    return [];
  }
};
