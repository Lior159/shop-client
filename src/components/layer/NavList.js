import styles from "./NavList.module.css";

const NavList = (props) => {
  return <ul className={styles["items-list"]}>{props.children}</ul>;
};

export default NavList;
