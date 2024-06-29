import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div style={{display: "flex", gap: ".5rem", alignContent: "center", justifyContent: "center", color: "var(--color-accent)", fontSize: "1.2rem"}}>
        Privacy Policy / Imprint
      </div>

      <p className={styles.footer_text}>
        &copy; 2023 Kazuki. All rights reserved.
      </p>
    </footer>
  );
}