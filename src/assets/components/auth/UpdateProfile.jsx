import { useRef, useState } from "react";
import { useAuth } from "./../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle.jsx";
import { useBackgroundColor } from "../../hooks/useBackgroundColor.jsx";

const UpdateProfile = () => {
  useTitle("Оновлення профілю");
  useBackgroundColor("bg-blue-500");

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Паролі не співпадають");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/lab4/dashboard");
      })
      .catch(() => {
        setError("Не вдалося оновити обліковий запис");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full">
      <div className="w-full rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Оновлення профілю
        </h2>
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
              defaultValue={currentUser.email}
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
              placeholder="Залиште порожнім, щоб зберегти поточний"
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password-confirm"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Підтвердження паролю
            </label>
            <input
              type="password"
              id="password-confirm"
              ref={passwordConfirmRef}
              placeholder="Залиште порожнім, щоб зберегти поточний"
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          >
            Оновити
          </button>
        </form>
      </div>
      <div className="mt-4 text-center">
        <Link
          to="/lab4/dashboard"
          className="inline-block w-full md:w-[60%] bg-white px-4 py-2.5 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out text-blue-500"
        >
          Скасувати
        </Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
