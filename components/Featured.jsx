import Link from "next/link";
import React from "react";
import styles from "../styles/Featured.module.css";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <div className={styles.description}>
          Pho Xic Lo Vietnamese Noodle House brings you fine Vietnamese dining
          in traditional style and flavours.
        </div>
        <div>
          <Link href="/#menu" passHref>
            <span className={styles.link}>
              Order Now
              <b className={styles.arrow}> ↓ </b>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
