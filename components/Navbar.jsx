import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menu]);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.text}>
          <Link href="/">PHO XIC LO</Link>
        </div>
      </div>
      <div className={styles.item}>
        <Link href="/cart" passHref>
          <div className={styles.cart}>Cart ({quantity})</div>
        </Link>
        <div
          className={styles.menuLogo}
          onClick={() => {
            setMenu(true);
          }}
        >
          ☰
        </div>
        {menu && (
          <ul className={styles.menu}>
            <li onClick={() => setMenu(false)}>
              ✖<br />
              <br />
            </li>
            <Link href="/#menu" passHref>
              <li onClick={() => setMenu(false)}>View Menu</li>
            </Link>

            <Link href="/cart" passHref>
              <li onClick={() => setMenu(false)}>Checkout({quantity})</li>
            </Link>
            <Link href="/#about" passHref>
              <li onClick={() => setMenu(false)}>About Us</li>
            </Link>
            <Link href="/#about" passHref>
              <li onClick={() => setMenu(false)}>Contact</li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
