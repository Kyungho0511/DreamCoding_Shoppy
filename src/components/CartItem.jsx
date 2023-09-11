import styles from "./CartItem.module.css";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useCart from "../hooks/useCart";

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { addOrUpdateItem, removeItem } = useCart();
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  const handleDelete = () => removeItem.mutate(id);

  return (
    <li className={styles.item}>
      <img className={styles.image} src={image} alt={title} />
      <div className={styles.container}>
        <div className={styles.text}>
          <h4>{title}</h4>
          <p className={styles.option}>{option}</p>
          <p>${price}</p>
        </div>
        <div className={styles.quantity}>
          <AiOutlineMinusSquare className={styles.icon} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={styles.icon} onClick={handlePlus} />
          <RiDeleteBin5Fill className={styles.icon} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
