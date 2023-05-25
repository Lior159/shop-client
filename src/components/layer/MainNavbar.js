import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/ohara-logo2.png";
import Button from "../ui/Button";

const MainNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <ul className="item-list left">
        <li>
          <img src={logo} alt="logo" />
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <ul className="item-list">
        <li>
          <div className="search-box">
            <form>
              <input type="text" />
              <button className="search_btn" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </li>
        <li>
          <i className="fa-solid fa-cart-shopping"></i>
        </li>
        <li>
          <Button
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Sign in
          </Button>
        </li>
      </ul>
    </header>
  );
};

export default MainNavbar;
