import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faClose,
  faBars,
  faUser,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./../contexts/AuthContext.jsx";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkClasses = (path) => {
    const baseClasses =
      "rounded-lg px-8 py-2 transition duration-300 ease-in-out";
    return `${baseClasses} ${
      isActive(path) ? "bg-gray-200 font-bold" : "hover:bg-gray-200"
    }`;
  };

  const getMobileLinkClasses = (path) => {
    const baseClasses = "block rounded-lg border border-gray-400 p-4";
    return `${baseClasses} ${
      isActive(path) ? "bg-gray-200 font-bold" : "hover:bg-gray-200"
    }`;
  };

  return (
    <>
      <header className="mx-auto my-3 flex h-[65px] w-full max-w-[1490px] items-center justify-between rounded-lg bg-white px-8 py-4 shadow-2xl">
        <div className="flex items-center text-[22px]">
          <FontAwesomeIcon icon={faUtensils} />
        </div>

        <nav>
          <ul className="hidden items-center gap-2 text-[20px] sm:flex lg:gap-16">
            <li>
              <Link to="/lab4" className={getLinkClasses("/lab4")}>
                Меню
              </Link>
            </li>
            <li>
              <Link to="/lab4/basket" className={getLinkClasses("/lab4/basket")}>
                Кошик
              </Link>
            </li>
            <li>
              <Link to="/lab4/orders" className={getLinkClasses("/lab4/orders")}>
                Мої замовлення
              </Link>
            </li>
            <li>
              {currentUser ? (
                <Link to="/lab4/dashboard" className={getLinkClasses("/lab4/dashboard")}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              ) : (
                <Link to="/lab4/login" className={getLinkClasses("/lab4/login")}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <button
          onClick={() => setOpenSidebar(true)}
          className="block text-[20px] sm:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      <nav
        className={`fixed right-0 top-0 z-10 h-full w-full transform bg-white shadow-lg transition-transform duration-300 ${
          openSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between py-6 pl-4 pr-8 text-[22px] font-bold">
          <ul className="flex w-[80%] flex-col gap-4">
            <li>
              <Link
                to="/lab4"
                className={getMobileLinkClasses("/lab4")}
                onClick={() => setOpenSidebar(false)}
              >
                Меню
              </Link>
            </li>
            <li>
              <Link
                to="/lab4/basket"
                className={getMobileLinkClasses("/lab4/basket")}
                onClick={() => setOpenSidebar(false)}
              >
                Кошик
              </Link>
            </li>
            <li>
              <Link
                to="/lab4/orders"
                className={getMobileLinkClasses("/lab4/orders")}
                onClick={() => setOpenSidebar(false)}
              >
                Мої замовлення
              </Link>
            </li>
            <li>
              {currentUser ? (
                <Link
                  to="/lab4/dashboard"
                  className={getMobileLinkClasses("/lab4/dashboard")}
                  onClick={() => setOpenSidebar(false)}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="ml-4">Профіль</span>
                </Link>
              ) : (
                <Link
                  to="/lab4/login"
                  className={getMobileLinkClasses("/lab4/login")}
                  onClick={() => setOpenSidebar(false)}
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span className="ml-4">Вхід</span>
                </Link>
              )}
            </li>
          </ul>
          <button
            onClick={() => setOpenSidebar(false)}
            className="block text-[22px] sm:hidden"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
