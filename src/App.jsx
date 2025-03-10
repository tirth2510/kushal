import { BrowserRouter as Router } from 'react-router-dom';
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Home from "./components/home/Home";
import { AuthProvider } from "./contexts/authcontexts";
import { useRoutes } from "react-router-dom";
import Header from './components/header/Header';
import Start from './components/intro/Start';
import './App.css';  // Your global styles
import 'tailwindcss/tailwind.css';  // Assuming Tailwind is correctly set up

function AppRoutes() {
  const routesArray = [
    {
      path: "/",
      element: <Start />, // Start should render for the root path
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "*", 
      element: <div>404 - Page not found</div>, // Catch-all for undefined routes
    },
  ];
  let routesElement = useRoutes(routesArray);
  return routesElement;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <Header /> */}
        <div className="w-full h-screen flex flex-col">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
