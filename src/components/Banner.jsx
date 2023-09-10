import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <section className={styles.container}>
      <div className={styles.banner} />
      <div className={styles.text}>
        <h2>Shop With Us</h2>
        <p>Best Products, High Quality</p>
      </div>
    </section>
  );
}
