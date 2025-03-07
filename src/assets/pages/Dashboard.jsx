import { useState } from "react";
import { useAuth } from "./../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle.jsx";
import { useBackgroundColor } from "../hooks/useBackgroundColor.jsx";

const Dashboard = () => {
  useTitle("Профіль");
  useBackgroundColor("bg-blue-500");

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/lab4");
    } catch {
      setError("Не вдалося вийти з системи");
    }
  };

  return (
    <main className="w-full py-4 flex-grow mx-auto max-w-[1490px] flex-1 text-center text-[20px]">
      <section className="w-full rounded-lg bg-white py-2 text-[30px] text-center">
        <h1>Профіль</h1>
      </section>
      <section className="mt-4 bg-white px-2 py-4 rounded-lg">
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}
        <p className="mb-4">
          <strong>Електронна пошта:</strong> {currentUser.email}
        </p>
        <section className="flex flex-col items-center md:flex-row justify-center gap-8 my-8">
          <Link
            to="/lab4/update-profile"
            className="block w-full md:w-[60%] rounded-lg bg-blue-600 px-4 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
          >
            Оновити профіль
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full md:w-[60%] rounded-lg bg-blue-600 px-4 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
          >
            Вийти
          </button>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
