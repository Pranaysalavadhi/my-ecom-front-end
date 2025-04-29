import "./App.css";
import React, { useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  return (
    <AppProvider>
      <BrowserRouter>
        {!isAuthenticated ? (
          // Show AuthForm if the user is not authenticated
          <AuthForm onLogin={() => setIsAuthenticated(true)} />
        ) : (
          // Show the rest of the app if the user is authenticated
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
