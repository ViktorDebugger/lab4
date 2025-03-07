const dishes = [
  {
    name: "Спайдер Рол",
    category: "Суші",
    description:
      "Суші з м'яким крабом, огірком, авокадо та спеціальним соусом, загорнуті в норі.",
    price: 180,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201799/dishes/spider.webp",
  },
  {
    name: "Рейнбоу Рол",
    category: "Суші",
    description:
      "Суші з різними видами риби, включаючи лосось, тунець та авокадо.",
    price: 200,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201797/dishes/rainbow.webp",
  },
  {
    name: "Текка Макі",
    category: "Суші",
    description: "Класичні суші з тунцем, загорнуті в норі з рисом.",
    price: 150,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201798/dishes/tekka-maki.webp",
  },
  {
    name: "Дракон Рол",
    category: "Суші",
    description: "Суші з вугрем, авокадо та огірком, прикрашені соусом унагі.",
    price: 220,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201783/dishes/dragon.webp",
  },
  {
    name: "Каліфорнія Рол",
    category: "Суші",
    description: "Суші з крабом, авокадо та огірком, загорнуті в норі з рисом.",
    price: 160,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201775/dishes/california.webp",
  },
  {
    name: "Філадельфія Рол",
    category: "Суші",
    description:
      "Суші з лососем, сиром філадельфія та авокадо, загорнуті в норі.",
    price: 190,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201796/dishes/philadelphia.webp",
  },
  {
    name: "Баффало Крила",
    category: "Закуски",
    description:
      "Гострі курячі крильця, обсмажені до хрусткої скоринки, подаються з соусом.",
    price: 120,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201773/dishes/buffalo-wings.webp",
  },
  {
    name: "Брускетта",
    category: "Закуски",
    description: "Італійські тости з помідорами, базиліком та оливковою олією.",
    price: 80,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201772/dishes/bruschetta.webp",
  },
  {
    name: "Цибулеві Кільця",
    category: "Закуски",
    description: "Хрусткі кільця цибулі, обсмажені до золотистої скоринки.",
    price: 70,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201774/dishes/onion-rings.webp",
  },
  {
    name: "Курячі Нагетси",
    category: "Закуски",
    description: "Соковиті курячі нагетси, обсмажені до хрусткої скоринки.",
    price: 100,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201778/dishes/chicken-nuggets.webp",
  },
  {
    name: "Моцарела Палички",
    category: "Закуски",
    description: "Сирні палички з моцарелою, обсмажені до хрусткої скоринки.",
    price: 90,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201779/dishes/mozzarella-sticks.webp",
  },
  {
    name: "Картопля Фрі",
    category: "Закуски",
    description: "Класична картопля фрі, обсмажена до хрусткої скоринки.",
    price: 50,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201780/dishes/french-fries.webp",
  },
  {
    name: "Мітлаверс",
    category: "Піца",
    description:
      "Піца з різними видами м'яса, включаючи ковбасу, бекон та шинку, з сиром та томатним соусом.",
    price: 250,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201790/dishes/meatlovers.webp",
  },
  {
    name: "Гавайська",
    category: "Піца",
    description: "Піца з ананасом, шинкою та сиром, з томатним соусом.",
    price: 220,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201787/dishes/hawaiian.webp",
  },
  {
    name: "Діавола",
    category: "Піца",
    description:
      "Гостра піца з салямі, перцем чилі та сиром, з томатним соусом.",
    price: 230,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201781/dishes/diavola.webp",
  },
  {
    name: "Чотири Сири",
    category: "Піца",
    description:
      "Піца з чотирма видами сиру, включаючи моцарелу, пармезан, горгонзолу та едам.",
    price: 240,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201782/dishes/four-cheese.webp",
  },
  {
    name: "Пепероні",
    category: "Піца",
    description: "Класична піца з пепероні, сиром та томатним соусом.",
    price: 210,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201795/dishes/pepperoni.webp",
  },
  {
    name: "Маргарита",
    category: "Піца",
    description:
      "Класична піца з томатами, сиром та базиліком, з томатним соусом.",
    price: 200,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201789/dishes/margherita.webp",
  },
  {
    name: "Лимонад",
    category: "Напої",
    description: "Охолоджуючий лимонад з натуральним лимонним соком.",
    price: 40,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201788/dishes/lemonade.webp",
  },
  {
    name: "Мохіто",
    category: "Напої",
    description: "Освіжаючий мохіто з м'ятою, лаймом та содовою.",
    price: 50,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201791/dishes/mojito.webp",
  },
  {
    name: "Апельсиновий Сік",
    category: "Напої",
    description: "Свіжовижатий апельсиновий сік без додавання цукру.",
    price: 45,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201792/dishes/orange-juice.webp",
  },
  {
    name: "Малиновий Напій",
    category: "Напої",
    description: "Напій з натуральним малиновим соком.",
    price: 35,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201798/dishes/raspberry.webp",
  },
  {
    name: "Вишневий Напій",
    category: "Напої",
    description: "Напій з натуральним вишневим соком.",
    price: 35,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201776/dishes/cherry.webp",
  },
  {
    name: "Полуничний Напій",
    category: "Напої",
    description: "Напій з натуральним полуничним соком.",
    price: 35,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201800/dishes/strawberry.webp",
  },
  {
    name: "Веганський Бургер",
    category: "Бургери",
    description: "Веганський бургер з овочевою котлетою, салатом та соусом.",
    price: 150,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201803/dishes/vegan.webp",
  },
  {
    name: "Гуакамоле Бургер",
    category: "Бургери",
    description: "Бургер з гуакамоле, яловичою котлетою та сиром.",
    price: 160,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201786/dishes/guacamole.webp",
  },
  {
    name: "Подвійний Бургер",
    category: "Бургери",
    description: "Бургер з двома яловичими котлетами, сиром та беконом.",
    price: 180,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201782/dishes/double.webp",
  },
  {
    name: "Бекон Бургер",
    category: "Бургери",
    description: "Бургер з яловичою котлетою, сиром та беконом.",
    price: 170,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201771/dishes/bacon.webp",
  },
  {
    name: "Курячий Бургер",
    category: "Бургери",
    description: "Бургер з курячою котлетою, салатом та соусом.",
    price: 160,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201778/dishes/chicken.webp",
  },
  {
    name: "Класичний Бургер",
    category: "Бургери",
    description: "Класичний бургер з яловичою котлетою, сиром та салатом.",
    price: 140,
    image:
      "https://res.cloudinary.com/dlistrvqm/image/upload/v1741201781/dishes/classic.webp",
  },
];

export default dishes;
