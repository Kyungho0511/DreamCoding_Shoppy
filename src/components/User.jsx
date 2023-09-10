import styles from "./User.module.css";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={photoURL} alt={displayName} />
      <span className={styles.text}>{displayName}</span>
    </div>
  );
}
