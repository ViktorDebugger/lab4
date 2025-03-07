import BasketItem from "./../components/BasketItem.jsx";
import { useEffect, useState } from "react";
import { useBackgroundColor } from "./../hooks/useBackgroundColor.jsx";
import { useTitle } from "./../hooks/useTitle.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext.jsx";
import {
  loadBasketFromFirestore,
  saveBasketToFirestore,
} from "../db/basket.js";
import { addOrderToFirestore, loadOrdersFromFirestore } from "../db/orders.js";

const Basket = () => {
  useTitle("Кошик");
  useBackgroundColor("bg-yellow-500");

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [basket, setBasket] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadBasket = async () => {
      if (currentUser) {
        try {
          const userBasket = await loadBasketFromFirestore(currentUser.uid);
          setBasket(userBasket);
        } catch (error) {
          console.error("Помилка завантаження кошика з Firestore:", error);
        }
      } else {
        const localBasket = JSON.parse(localStorage.getItem("basket")) || [];
        setBasket(localBasket);
      }
    };

    loadBasket();
  }, [currentUser]);

  useEffect(() => {
    const loadOrders = async () => {
      if (currentUser) {
        try {
          const userOrders = await loadOrdersFromFirestore(currentUser.uid);
          setOrders(userOrders);
        } catch (error) {
          console.error("Помилка завантаження замовлень з Firestore:", error);
        }
      }
    };

    loadOrders();
  }, [currentUser]);

  const updateBasket = async (newBasket) => {
    setBasket(newBasket);
    if (currentUser) {
      try {
        await saveBasketToFirestore(currentUser.uid, newBasket);
      } catch (error) {
        console.error("Помилка оновлення кошика в Firestore:", error);
      }
    } else {
      localStorage.setItem("basket", JSON.stringify(newBasket));
    }
  };

  const makeOrder = async () => {
    if (!currentUser) return;

    const newOrder = {
      orderId: orders.length + 1,
      items: basket,
      orderStartDatetime: new Date(),
      totalPrice: basket.reduce(
        (accum, cur) => accum + cur.dish.price * cur.count,
        0
      ),
      totalCount: basket.reduce((accum, cur) => accum + cur.count, 0),
      orderEndDatetime: new Date(new Date().getTime() + 30 * 60000),
    };

    try {
      await addOrderToFirestore(currentUser.uid, newOrder);
    } catch (error) {
      console.error("Помилка додавання замовлення до Firestore:", error);
    }

    setBasket([]);

    if (currentUser) {
      try {
        await saveBasketToFirestore(currentUser.uid, []);
      } catch (error) {
        console.error("Помилка видалення кошика з Firestore:", error);
      }
    }

    navigate("/lab4/orders");
  };

  const incrementBasketItem = (id) => {
    const newBasket = basket.map((item) =>
      item.orderDishId === id
        ? { ...item, count: item.count < 100 ? item.count + 1 : item.count }
        : item
    );
    updateBasket(newBasket);
  };

  const decrementBasketItem = (id) => {
    const newBasket = basket.map((item) =>
      item.orderDishId === id
        ? { ...item, count: item.count > 0 ? item.count - 1 : item.count }
        : item
    );
    updateBasket(newBasket);
  };

  const deleteBasketItem = (id) => {
    const newBasket = basket.filter((item) => item.orderDishId !== id);
    updateBasket(newBasket);
  };

  return (
    <main className="mx-auto w-full flex-grow max-w-[1490px] flex-1 rounded-lg py-4 text-center text-[30px]">
      <section className="w-full rounded-lg bg-white py-2 text-[30px]">
        <h1>Кошик</h1>
      </section>

      <section className="mt-4 max-w-[1490px] rounded-lg border-[4px] border-white px-2 py-4 2xl:mx-auto">
        <article>
          {basket.length ? (
            <>
              <ul className="col-span-1 grid grid-cols-1 gap-2">
                {basket.map((item) => (
                  <BasketItem
                    key={item.orderDishId}
                    item={item}
                    incrementBasketItem={incrementBasketItem}
                    decrementBasketItem={decrementBasketItem}
                    deleteBasketItem={deleteBasketItem}
                  />
                ))}
              </ul>
              <footer className="mx-auto mt-4 flex w-full max-w-[1490px] flex-col items-center justify-between gap-4 rounded-lg bg-white px-8 py-4 text-left text-[14px] md:text-[18px] md:flex-row xl:text-[22px]">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex items-center gap-2 w-[200px] md:w-[280px] xl:w-[340px]">
                    <span>Загальний рахунок</span>
                    <span className="text-gray-500">
                      $
                      {basket.reduce(
                        (accum, cur) => accum + cur.dish.price * cur.count,
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Загальна кількість</span>
                    <span className="h-[35px] w-[35px] rounded-lg bg-gray-300 p-1 text-center text-[14px] md:text-[18px]">
                      {basket.reduce((accum, cur) => accum + cur.count, 0)}
                    </span>
                  </div>
                </div>
                {currentUser ? (
                  <button
                    onClick={makeOrder}
                    className="rounded-lg border-[2px] border-black px-6 py-2 transition duration-300 ease-in-out hover:bg-black hover:text-white"
                  >
                    Замовити
                  </button>
                ) : (
                  <Link
                    to="/lab4/login"
                    className="rounded-lg border-[2px] border-black px-6 py-2 transition duration-300 ease-in-out hover:bg-black hover:text-white"
                  >
                    Замовити
                  </Link>
                )}
              </footer>
            </>
          ) : (
            <div className="h-[340px] text-white flex items-center justify-center">
              Пусто
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default Basket;
