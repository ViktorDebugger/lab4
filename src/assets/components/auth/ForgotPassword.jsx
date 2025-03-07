import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle.jsx";
import { useBackgroundColor } from "../../hooks/useBackgroundColor.jsx";

const ForgotPassword = () => {
  useTitle("Відновлення паролю");
  useBackgroundColor("bg-blue-500");

  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Перевірте вашу електронну пошту для подальших інструкцій");
    } catch {
      setError("Не вдалося скинути пароль");
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="w-full rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Відновлення паролю
        </h2>
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700">
            {message}
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
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          >
            Скинути пароль
          </button>
        </form>
      </div>
      <div className="mt-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/lab4/login"
            className="inline-block w-full md:w-[60%] bg-white px-4 py-2.5 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out text-blue-500"
          >
            Увійти
          </Link>
          <div className="flex flex-col items-center">
            <p>Немає облікового запису?</p>
            <Link
              to="/lab4/signup"
              className="inline-block w-full bg-white px-4 py-2.5 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out text-blue-500 mt-2"
            >
              Зареєструватися
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
