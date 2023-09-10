import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

export default function ProductCard({
  product,
  product: { id, image, title, category, price },
}) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className={styles.item}
    >
      <img className={styles.image} src={image} alt={title} />
      <div className={styles.text}>
        <h3>{title}</h3>
        <p>{`$${price}`}</p>
      </div>
      <p className={styles.category}>{category}</p>
    </li>
  );
}
