import styles from "./ShopPage.module.css";
import Product from "../components/products/Product";

const ShopPage = () => {
  return (
    <section className={styles["shop-section"]}>
      <div className={styles["left-menu"]}>
        <div>
          <h4>Price</h4>
          <div>
            <input type="number" name="minPrice" placeholder="min" min="0" />
            <span>To</span>
            <input type="number" name="maxPrice" placeholder="max" min="0" />
          </div>
        </div>
      </div>
      <div className={styles["products-container"]}>
        <Product />
        <Product />
        <Product />
      </div>
    </section>
  );
};

export default ShopPage;
