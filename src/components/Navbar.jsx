import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <BiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className={styles.nav}>
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new">
          <BsFillPencilFill />
        </Link>
        <button className={styles.button}>Login</button>
      </nav>
    </header>
  );
}
