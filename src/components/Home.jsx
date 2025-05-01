import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `https://ecom-backend-proj.onrender.com/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: unplugged };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <div className="error-container" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
        padding: "20px"
      }}>
        <img 
          src={unplugged} 
          alt="Connection Error" 
          style={{ 
            width: "80px", 
            height: "80px",
            marginBottom: "20px",
            opacity: "0.8"
          }} 
        />
        <h3 style={{
          color: "#dc3545",
          fontSize: "1.5rem",
          marginBottom: "10px",
          fontWeight: "500"
        }}>
          Connection Error
        </h3>
        <p style={{
          color: "#6c757d",
          fontSize: "1rem",
          maxWidth: "400px",
          lineHeight: "1.5"
        }}>
          We're having trouble connecting to our servers. Please check your internet connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid"
      style={{
        marginTop: "64px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {filteredProducts.length === 0 ? (
        <div style={{
          gridColumn: "1 / -1",
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          margin: "20px 0"
        }}>
          <p style={{
            fontSize: "1rem",
            color: "#6c757d",
            lineHeight: "1.6"
          }}>
            <span style={{ fontSize: "1.2rem", display: "block", marginBottom: "10px" }}>🚀 Powered by AWS RDS</span>
            Fetching data from a secure cloud database. This may take a few seconds — thank you for your patience!
            <br />
            Demonstrating real-world backend integration using MySQL on Amazon RDS
          </p>
        </div>
      ) : (
        filteredProducts.map((product) => {
          const { id, brand, name, price, productAvailable, imageUrl } = product;
          return (
            <div
              className="card mb-3"
              style={{
                width: "250px",
                height: "360px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: productAvailable ? "#fff" : "#ccc",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
              }}
              key={id}
            >
              <Link
                to={`/product/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={imageUrl}
                  alt={name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    padding: "5px",
                    margin: "0",
                    borderRadius: "10px 10px 10px 10px",
                  }}
                />
                <div
                  className="card-body"
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <div>
                    <h5
                      className="card-title"
                      style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                    >
                      {name.toUpperCase()}
                    </h5>
                    <i
                      className="card-brand"
                      style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                    >
                      {"~ " + brand}
                    </i>
                  </div>
                  <hr className="hr-line" style={{ margin: "10px 0" }} />
                  <div className="home-cart-price">
                    <h5
                      className="card-text"
                      style={{
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        marginBottom: "5px",
                      }}
                    >
                      <i className="bi bi-currency-rupee"></i>
                      {price}
                    </h5>
                  </div>
                  <button
                    className="btn-hover color-9"
                    style={{ margin: "10px 25px 0px" }}
                    onClick={() => {
                      try {
                        addToCart(product);
                      } catch (error) {
                        console.error("Error adding product to cart:", error);
                      }
                    }}
                    disabled={!productAvailable}
                  >
                    {productAvailable ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;