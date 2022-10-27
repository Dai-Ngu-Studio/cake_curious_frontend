import Shop from "../assets/img/shop.png";
import Product from "../assets/img/product.png";

export const DefaultImage = (keyword) => {
  switch (keyword) {
    case "store-detail":
      return Shop;
    case "product-detail":
      return Product;
    default:
      return null;
  }
};
