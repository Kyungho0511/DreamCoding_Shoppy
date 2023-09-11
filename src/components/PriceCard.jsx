import styles from "./PriceCard.module.css";

export default function PriceCard({ text, price }) {
  return (
    <div className={styles.container}>
      <p>{text}</p>
      <p className={styles.price}>${price}</p>
    </div>
  );
}
