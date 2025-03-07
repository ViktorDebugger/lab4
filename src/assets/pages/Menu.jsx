import { useState, useEffect } from "react";
import DishCard from "./../components/DishCard.jsx";
import CategorySelect from "./../components/CategorySelect.jsx";
import SearchInput from "./../components/SearchInput.jsx";
import Pagination from "./../components/Pagination.jsx";
import { useBackgroundColor } from "./../hooks/useBackgroundColor.jsx";
import { useTitle } from "./../hooks/useTitle.jsx";
import { useAuth } from "./../contexts/AuthContext.jsx";
import {
  saveBasketToFirestore,
  loadBasketFromFirestore,
} from "../db/basket.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../js/firebase.js";

const Menu = () => {
  useTitle("Меню");
  useBackgroundColor("bg-red-500");

  const itemsPerPage = 8;
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [dishes, setDishes] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [basket, setBasket] = useState([]);
  const [dishesData, setDishesData] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dishes"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDishesData(data);
      } catch (error) {
        console.error("Помилка отримання даних: ", error);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    setFilteredDishes(dishesData);
    setDishes(dishesData.slice(0, itemsPerPage));
  }, [dishesData]);

  useEffect(() => {
    updateDishes();
  }, [selectCategory]);

  useEffect(() => {
    setBasket([]);
    const loadAndTransferBasket = async () => {
      if (currentUser) {
        try {
          const basketFromFirestore = await loadBasketFromFirestore(
            currentUser.uid
          );
          if (basketFromFirestore.length > 0) {
            setBasket(basketFromFirestore);
            localStorage.removeItem("basket");
          } else {
            const localBasket =
              JSON.parse(localStorage.getItem("basket")) || [];
            if (localBasket.length > 0) {
              await saveBasketToFirestore(currentUser.uid, localBasket);
              setBasket(localBasket);
              localStorage.removeItem("basket");
            }
          }
        } catch (error) {
          console.error("Помилка завантаження або перенесення кошика:", error);
        }
      } else {
        const localBasket = JSON.parse(localStorage.getItem("basket")) || [];
        setBasket(localBasket);
      }
    };

    loadAndTransferBasket();
  }, [currentUser]);

  const updateDishes = () => {
    const filtered = dishesData.filter(
      (dish) =>
        dish.name.toLowerCase().includes(inputSearch.toLowerCase()) &&
        (selectCategory ? dish.category === selectCategory : true)
    );
    setFilteredDishes(filtered);
    setCurrentPage(1);
    setDishes(filtered.slice(0, itemsPerPage));
  };

  const handleSelect = (value) => {
    setSelectCategory(value);
  };

  const handleOrder = async (dishId) => {
    const selectedDish = dishes.find((dish) => dish.id === dishId);
    if (selectedDish) {
      const newBasket = [
        ...basket,
        { orderDishId: basket.length + 1, dish: selectedDish, count: 1 },
      ];
      setBasket(newBasket);

      if (currentUser) {
        try {
          await saveBasketToFirestore(currentUser.uid, newBasket);
        } catch (error) {
          console.error("Помилка збереження корзини в Firestore:", error);
        }
      } else {
        localStorage.setItem("basket", JSON.stringify(newBasket));
      }
    }
  };

  const isInBasket = (dishName) => {
    return basket.some((item) => item.dish.name === dishName);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDishes(filteredDishes.slice(start, end));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const totalPages = Math.ceil(filteredDishes.length / itemsPerPage);
  console.log(dishes);
  return (
    <main className="mx-auto py-4 flex-grow w-full max-w-[1490px] flex-1 rounded-lg text-center text-[20px]">
      <section className="w-full rounded-lg bg-white py-2 text-[30px]">
        <h1>Меню</h1>
      </section>

      <section className="mt-4 flex max-w-[1490px] flex-col items-center justify-between gap-2 rounded-lg bg-white px-2 py-4 sm:flex-row 2xl:mx-auto">
        <CategorySelect value={selectCategory} onChange={handleSelect} />
        <SearchInput
          value={inputSearch}
          onChange={setInputSearch}
          onSearch={updateDishes}
        />
      </section>

      <section>
        {dishes.length ? (
          <ul className="mt-4 grid max-w-[1490px] grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:mx-auto">
            {dishes.map((item) => (
              <DishCard
                key={item.id}
                dish={item}
                handleOrder={handleOrder}
                isInBasket={isInBasket}
              />
            ))}
          </ul>
        ) : (
          <div className="h-[380px] mt-4 text-white border-4 border-white rounded-lg flex items-center justify-center">
            Пусто
          </div>
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Menu;
