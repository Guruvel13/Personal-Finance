import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Settings from "./pages/Dashboard/Settings";
import Landing from "./pages/Landing/Landing";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
            <Route path="/settings" exact element={<Settings />} />
          </Routes>
        </Router>
      </div>
      <Toaster 
        toastOptions={{
          className: "",
          style:{
            fontSize :"13px"
          },
        }}
      />
    </UserProvider>
  );
}
export default App;
