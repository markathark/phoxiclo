import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.card}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.text}>
            info@phoxiclo.ca
            <br /> +1 519 971 8288
            <br />
            <br />
            facebook
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Visit us</h1>
          <p className={styles.text}>
            1750 Wyandotte Street West
            <br /> Windsor, ON
            <br /> Canada
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Working Hours</h1>
          <p className={styles.text}>
            Monday Until Friday
            <br /> 9:00 - 22:00
          </p>
          <p className={styles.text}>
            Monday Until Friday
            <br /> 9:00 - 22:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
