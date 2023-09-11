import styles from "./MyCart.module.css";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

const SHIPPING = 30;

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>My Cart</h3>
      {!hasProducts && <p>No products in My Cart.</p>}
      {hasProducts && (
        <>
          <ul className={styles.list}>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className={styles.price}>
            <PriceCard text="Products" price={totalPrice} />
            <BsFillPlusCircleFill className={styles.icon} />
            <PriceCard text="Shipping fee" price={SHIPPING} />
            <FaEquals className={styles.icon} />
            <PriceCard text="Total" price={totalPrice + SHIPPING} />
          </div>
          <Button text="Procced to checkout" />
        </>
      )}
    </section>
  );
}
