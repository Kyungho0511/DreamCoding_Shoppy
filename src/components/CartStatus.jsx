import styles from "./CartStatus.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "../hooks/useCart";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className={styles.container}>
      <AiOutlineShoppingCart className={styles.icon} />
      {products && <p>{products.length}</p>}
    </div>
  );
}
