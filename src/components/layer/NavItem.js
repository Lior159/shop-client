import styles from "./NavItem.module.css";

const NavItem = (props) => {
  return (
    <li className={`${styles.item} ${props.className}`}>{props.children}</li>
  );
};

export default NavItem;
