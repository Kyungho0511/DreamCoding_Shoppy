import styles from "./CartItem.module.css";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
  uid,
}) {
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
  const handleDelete = () => removeFromCart(uid, id);

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
