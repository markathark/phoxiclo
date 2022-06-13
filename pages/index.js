import Head from "next/head";
import Featured from "../components/Featured";
import FoodList from "../components/FoodList";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home({ phoList }) {
  const quantity = useSelector((state) => state.cart.quantity);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menu]);
  return (
    <div>
      <Head>
        <title>Vietnamese Restaurant in Windsor, Ontario</title>
        <meta name="description" content="Best Pho in Windsor, Ontario" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <div className={styles.wrapper} id="menu">
        <div className={styles.stickynav}>
          <div className={styles.menutitle} onClick={() => setMenu(true)}>
            <div className={styles.categories}>☰</div>
            MENU
          </div>

          <ul className={menu ? styles.navlistMenu : styles.navlist}>
            <li onClick={() => setMenu(false)}>
              <Link href="#appetizers">Appetizers</Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link href="#beefsoup">Beef Soup</Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link href="#chickensoup">Chicken Soup</Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link href="#rice">Rice</Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link href="#vermicelli">Vermicelli</Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link href="#thai">Thai</Link>
            </li>
          </ul>
          <Link href="/cart" passHref>
            <div className={styles.cart}>Cart ({quantity})</div>
          </Link>
        </div>
        <FoodList
          id="appetizers"
          title="Appetizers"
          desc="Pho Xic Lo special four season rolls, chicken wings and fresh-made
          salads."
          phoList={phoList.filter((food) => food.category === "Appetizer")}
        />
        <FoodList
          id="beefsoup"
          title="Beef Soup"
          desc="Our Beef Soup comes from the choicest cuts of meat, together with rice noodle
        in a bowl of delicate beef broth with herbs and spices, served with a
        side of bean sprouts, chilly pepper and asian basil.​"
          phoList={phoList.filter((food) => food.category === "Beef Soup")}
        />
        <FoodList
          id="chickensoup"
          title="Chicken Soup"
          desc="Our Chicken Soups comes with egg or rice noodle in a bowl of our light chicken broth giving you an alternative to rich flavoured pho soup, served with cooked bean sprouts and vegetables"
          phoList={phoList.filter((food) => food.category === "Chicken Soup")}
        />
        <FoodList
          id="rice"
          title="Rice"
          desc="Our Rice dishes are served with Jasmine rice, pickled cabbage, pickled carrot and cucumber with a side of fish sauce and choice of meat combinations."
          phoList={phoList.filter((food) => food.category === "Rice")}
        />
        <FoodList
          id="vermicelli"
          title="Vermicelli"
          desc="Our Vermicelli dishes come with a combination of meat on vermicelli noodles served with lettuce, bean sprouts, cucumber, pickled carrots, pickled cabbage, mint leaf, peanut and a side of Nước Mắm"
          phoList={phoList.filter((food) => food.category === "Vermicelli")}
        />
        <FoodList
          id="thai"
          title="Thai"
          desc="From Pad Thai noodles to delicious Curry served with Rice"
          phoList={phoList.filter((food) => food.category === "Thai")}
        />
      </div>
      <div id="about" className={styles.about}>
        <div className={styles.aboutTitle}>Pho Xic Lo</div>
        <div className={styles.aboutDesc}>
          Located at 1750 Wyandotte St. W. in Windsor, Pho Xic Lo Vietnamese
          Noodle House brings you fine Vietnamese dinning in traditional style
          and flavours. Fresh daily made appetizers, tasteful Phở noodles with
          beef broth or a light Hủ Tíu chicken soup for the noodles lovers.
          Vietnamese marinated Shish Kebab style served with jasmine rice or Bún
          vermicelli noodles and vegetables. Also don't miss out on our popular
          house special fried rice and sazzy Pad Thai noodles and creamy green
          curry. There is so much to adventure right here at Pho Xic Lo.
          <br />
          <br />
          (L.L.B.O. licensed). We accept Interac or cash.
        </div>
        <Link href="#menu" passHref>
          <button className={styles.button}>View Menu</button>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await axios.get("https://phoxiclo.vercel.app/api/products");
  return {
    props: {
      phoList: res.data,
    },
  };
};
