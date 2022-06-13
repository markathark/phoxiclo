import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pho }) => {
  const [price, setPrice] = useState(pho.prices[0][1]);
  const [size, setSize] = useState(pho.prices[0][0]);
  const [sizePrice, setSizePrice] = useState(pho.prices[0][1]);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (p) => {
    const difference = p[1] - sizePrice;
    setSize(p[0]);
    setSizePrice(p[1]);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(option.price * -1);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    const id = new Date().valueOf();
    dispatch(addProduct({ ...pho, extras, size, price, quantity, notes, id }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pho.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.price}>$ {price}</span>
        <h1 className={styles.title}>{pho.title}</h1>
        <p className={styles.desc}>{pho.desc}</p>
        {pho.prices.length !== 1 && (
          <>
            <h3 className={styles.choose}>Choose the size</h3>
            <div className={styles.sizes}>
              {pho.prices.map((p) => (
                <button
                  key={p[0]}
                  onClick={(e) => handleSize(p)}
                  className={
                    size === p[0] ? styles.activeSize : styles.otherSize
                  }
                >
                  {p[0]} ${p[1]}
                </button>
              ))}
            </div>
          </>
        )}
        {pho.extraOptions.length !== 0 && (
          <>
            <h3 className={styles.choose}>Add Extra</h3>
            <div className={styles.ingredients}>
              {pho.extraOptions.map((option) => (
                <div className={styles.option} key={option._id}>
                  <input
                    type="checkbox"
                    id={option.text}
                    name={option.text}
                    className={styles.checkbox}
                    onChange={(e) => handleChange(e, option)}
                  />
                  <label htmlFor={option.text}>
                    {option.text} +${option.price}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
        <div className={styles.notes}>
          <h3 className={styles.choose}>Additional Requests</h3>
          <textarea
            className={styles.addnotes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
          ></textarea>
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://phoxiclo.vercel.app/api/products/${params.id}`
  );
  return {
    props: {
      pho: res.data,
    },
  };
};

export default Product;
