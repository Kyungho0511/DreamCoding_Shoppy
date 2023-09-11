import styles from "./MyCart.module.css";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { getCart } from "../api/firebase";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import Button from "../components/ui/Button";

const SHIPPING = 30;

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  products && console.log(products);
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
                <CartItem key={product.id} product={product} uid={uid} />
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
