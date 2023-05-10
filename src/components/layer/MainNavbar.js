import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MainNavbar.module.css";
import logo from "../../assets/ohara-logo2.png";
import NavList from "./NavList";
import NavItem from "./NavItem";
import SearchInput from "./SearchInput";
import Button from "../ui/Button";

const setActiveClass = ({ isActive }) => {
  return isActive ? styles.active : undefined;
};

const MainNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <NavList>
        <NavItem>
          <img src={logo} alt="logo" />
        </NavItem>
        <NavItem className={styles.link}>
          <NavLink to="/" className={setActiveClass}>
            Home
          </NavLink>
        </NavItem>
        <NavItem className={styles.link}>
          <NavLink to="/shop" className={setActiveClass}>
            Shop
          </NavLink>
        </NavItem>
        <NavItem className={styles.link}>
          <NavLink to="/contact" className={setActiveClass}>
            Contact
          </NavLink>
        </NavItem>
      </NavList>
      <NavList>
        <NavItem>
          <SearchInput />
        </NavItem>
        <NavItem className={styles.link}>
          <i className="fa-solid fa-cart-shopping"></i>
        </NavItem>
        <NavItem>
          <Button
            onClick={() => {
              console.log("xxx");
              navigate("/sign-in");
            }}
          >
            Sign in
          </Button>
        </NavItem>
      </NavList>
    </header>
  );
};

export default MainNavbar;
