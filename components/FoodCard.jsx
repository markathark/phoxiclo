import styles from "../styles/FoodCard.module.css";
import Image from "next/image";
import Link from "next/link";

const FoodCard = ({ pho }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pho._id}`} passHref>
        <Image src={pho.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>
        <span>{pho.title}</span>
        <span className={styles.price}>$ {pho.prices[0][1]}</span>
      </h1>
      <p className={styles.desc}>{pho.desc}</p>
    </div>
  );
};

export default FoodCard;
