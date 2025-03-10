import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./assets/components/Footer.jsx";
import Header from "./assets/components/Header.jsx";
import Menu from "./assets/pages/Menu.jsx";
import Basket from "./assets/pages/Basket.jsx";
import Orders from "./assets/pages/Orders.jsx";
import Signup from "./assets/components/auth/Signup.jsx";
import Login from "./assets/components/auth/Login.jsx";
import { AuthProvider } from "./assets/contexts/AuthContext.jsx";
import PrivateRoute from "./assets/components/auth/PrivateRoute.jsx";
import Dashboard from "./assets/pages/Dashboard.jsx";
import ForgotPassword from "./assets/components/auth/ForgotPassword.jsx";
import UpdateProfile from "./assets/components/auth/UpdateProfile.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Аутентифікаційні маршрути */}
          <Route
            path="/lab4/signup"
            element={
              <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-8">
                  <Signup />
                </div>
              </div>
            }
          />
          <Route
            path="/lab4/login"
            element={
              <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-8">
                  <Login />
                </div>
              </div>
            }
          />
          <Route
            path="/lab4/forgot-password"
            element={
              <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-8">
                  <ForgotPassword />
                </div>
              </div>
            }
          />
          <Route
            path="/lab4/update-profile"
            element={
              <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-8">
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                </div>
              </div>
            }
          />

          {/* Основні маршрути */}
          <Route
            path="/lab4"
            element={
              <div className="flex min-h-screen flex-col">
                <Header />
                  <Menu />
                <Footer />
              </div>
            }
          />
          <Route
            path="/lab4/basket"
            element={
              <div className="flex min-h-screen flex-col">
                <Header />
                  <Basket />
                <Footer />
              </div>
            }
          />
          <Route
            path="/lab4/orders"
            element={
              <div className="flex min-h-screen flex-col">
                <Header />
                  <Orders />
                <Footer />
              </div>
            }
          />
          <Route
            path="/lab4/dashboard"
            element={
              <div className="flex min-h-screen flex-col">
                <Header />
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                <Footer />
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
