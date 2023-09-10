import styles from "./ProductDetail.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ProductDetail() {
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    // Add to Cart
  };

  return (
    <section>
      <p className={styles.category}>{category}</p>
      <section className={styles.container}>
        <div>
          <img className={styles.image} src={image} alt={title} />
        </div>
        <div className={styles.text}>
          <h2>{title}</h2>
          <h2 className={styles.price}>${price}</h2>
          <p>{description}</p>
          <div className={styles.options}>
            <label className={styles.label} htmlFor="select">
              Options:
            </label>
            <select
              className={styles.select}
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text="Add to Cart" onClick={handleClick} />
        </div>
      </section>
    </section>
  );
}
