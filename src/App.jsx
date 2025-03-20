import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Home from "./components/home/Home";
import Email from "./components/email/Email"; // Import the Email page
import Start from './components/intro/Start';
import { AuthProvider } from "./contexts/authcontexts";
import './App.css';  // Global styles
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
      path: "/email",  // New route for Email page
      element: <Email />,
    },
    {
      path: "*", 
      element: <div className="text-center mt-10 text-2xl font-bold">404 - Page Not Found</div>, // Catch-all for undefined routes
    },
  ];
  
  return useRoutes(routesArray);
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="w-full h-screen flex flex-col">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
