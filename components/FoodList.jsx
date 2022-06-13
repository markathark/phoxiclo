import styles from "../styles/FoodList.module.css";
import FoodCard from "./FoodCard";

const FoodList = (props) => {
  return (
    <div className={styles.container} id={props.id}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.desc}>{props.desc}</div>
      <div className={styles.wrapper}>
        {props.phoList.map((pho) => (
          <FoodCard key={pho._id} pho={pho} />
        ))}
      </div>
    </div>
  );
};

export default FoodList;
