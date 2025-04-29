import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import AuthForm from "./components/AuthForm"; // Import AuthForm
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  // Initialize based on sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  return (
    <AppProvider>
      <BrowserRouter>
        {!isAuthenticated ? (
          <AuthForm onLogin={handleLogin} />
        ) : (
          <>
            <Navbar onSelectCategory={handleCategorySelect} />
            <Routes>
              <Route
                path="/"
                element={<Home selectedCategory={selectedCategory} />}
              />
              <Route path="/add_product" element={<AddProduct />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/update/:id" element={<UpdateProduct />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
