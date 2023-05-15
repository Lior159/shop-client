import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import pic from "../../assets/pic2.jpg";

const Product = (props) => {
  return (
    <div className={styles.product}>
      <div className={styles["product-image"]}>
        <img src={pic} alt="img" />
      </div>
      <div className={styles["product-description"]}>
        <h3>{props.title}Bag</h3>
        <p>
          {props.description}desction Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Eius, maxime.
        </p>
        <h4>{props.price}$29.99</h4>
      </div>
      <div className={styles["product-actions"]}>
        <form action="/add-to-cart" method="post">
          <Link>Details</Link>
          <button type="submit">Add To Cart</button>
        </form>
      </div>
    </div>
  );
};

export default Product;
