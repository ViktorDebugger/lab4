import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle.jsx";
import { useBackgroundColor } from "../../hooks/useBackgroundColor.jsx";

const Login = () => {
  useTitle("Вхід");
  useBackgroundColor("bg-blue-500");

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Не вдалося увійти в систему");
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="w-full rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">Вхід</h2>
        {currentUser && (
          <p className="mb-4 text-sm text-gray-600">
            {JSON.stringify(currentUser)}
          </p>
        )}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Електронна пошта
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          >
            Увійти
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-800"
          >
            Забули пароль?
          </Link>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p>Немає облікового запису?</p>
        <div className="mt-2 flex flex-col items-center">
          <Link
            to="/signup"
            className="inline-block w-full md:w-[60%] bg-white px-4 py-2.5 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out text-blue-500"
          >
            Зареєструватися
          </Link>
          <Link
            to="/"
            className="inline-block w-full md:w-[60%] bg-white px-4 py-2.5 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out text-blue-500 mt-12"
          >
            Повернутись на головну
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
