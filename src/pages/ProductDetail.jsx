import s from "./ProductDetail.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("Successfully added to cart");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };

  return (
    <section>
      <p className={s.category}>{category}</p>
      <section className={s.container}>
        <div>
          <img className={s.image} src={image} alt={title} />
        </div>
        <div className={s.text}>
          <h2>{title}</h2>
          <h2 className={s.price}>${price}</h2>
          <p>{description}</p>
          <div className={s.options}>
            <label className={s.label} htmlFor="select">
              Options:
            </label>
            <select
              className={s.select}
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
          {success && <p className={s.success}>✔️{success}</p>}
          <Button text="Add to Cart" onClick={handleClick} />
        </div>
      </section>
    </section>
  );
}
