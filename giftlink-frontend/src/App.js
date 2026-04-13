import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Navbar/Navbar.js";
import MainPage from "./components/MainPage/MainPage.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import RegisterPage from "./components/RegisterPage/RegisterPage.js";
import ProductPage from "./components/ProductPage/ProductPage.js";
import SearchPage from "./components/SearchPage/SearchPage.js";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ✅ Main app routes */}
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/product/:id" element={<ProductPage />} />
        <Route path="/app/search" element={<SearchPage />} />

        {/* 🔥 Redirect ANY unknown route */}
        <Route path="*" element={<Navigate to="/app" />} />
      </Routes>
    </>
  );
}

export default App;