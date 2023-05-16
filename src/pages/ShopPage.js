import Product from "../components/products/Product";

const ShopPage = () => {
  return (
    <section className="shop-section">
      <div className="left-menu">
        <div>
          <h4>Price</h4>
          <div>
            <input type="number" name="minPrice" placeholder="min" min="0" />
            <span>To</span>
            <input type="number" name="maxPrice" placeholder="max" min="0" />
          </div>
        </div>
      </div>
      <div className="products-container">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </section>
  );
};

export default ShopPage;
