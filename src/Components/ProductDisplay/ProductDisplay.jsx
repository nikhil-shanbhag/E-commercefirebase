import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import "./ProductDisplay.css";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  const renderStars = () => {
    return (
      <>
        <img src={star_icon} alt="Star" />
        <img src={star_icon} alt="Star" />
        <img src={star_icon} alt="Star" />
        <img src={star_icon} alt="Star" />
        <img src={star_dull_icon} alt="Star" />
      </>
    );
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={product.image} alt={`Product ${i}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt="Product"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {renderStars()}
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting, and
          with a round neckline and short sleeves, worn as an undershirt or
          outer-garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size}>{size}</div>
            ))}
          </div>
          <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
          <p className="productdisplay-right-category">
            <span>Category :</span>Women, T-shirt, Crop Top
          </p>
          <p className="productdisplay-right-category">
            <span>Tags :</span>Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
