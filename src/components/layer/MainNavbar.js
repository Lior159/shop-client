import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/ohara-logo2.png";
import Button from "../ui/Button";

const MainNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <ul className="item-list left">
        <li className="item">
          <img src={logo} alt="logo" />
        </li>
        <li className="item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="item">
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li className="item">
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <ul className="item-list right">
        <li className="item">
          <div className="search-box">
            <form>
              <input type="text" />
              <button className="search_btn" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </li>
        <li className="item">
          <i className="fa-solid fa-cart-shopping"></i>
        </li>
        <li className="item">
          <Button
            onClick={() => {
              console.log("xxx");
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
