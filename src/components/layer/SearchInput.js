import styles from "./SearchInput.module.css";

const SearchInput = () => {
  return (
    <div className={styles["search-box"]}>
      <form>
        <input type="text" />
        <button className={styles.search_btn} type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
