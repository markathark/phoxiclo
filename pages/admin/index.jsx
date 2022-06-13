import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Add from "../../components/Add";
import AddButton from "../../components/AddButton";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products, admin }) => {
  const [phoList, setPhoList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [close, setClose] = useState(true);
  const status = ["preparing", "on the way", "delivered"];
  console.log(orders);
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "https://phoxiclo.vercel.app/api/products/" + id
      );
      setPhoList(phoList.filter((pho) => pho._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    if (currentStatus >= 2) {
      const res = await axios.delete(
        "https://phoxiclo.vercel.app/api/orders/" + id
      );
      setOrderList(orderList.filter((order) => order._id !== id));
    } else {
      try {
        const res = await axios.put(
          "https://phoxiclo.vercel.app/api/orders/" + id,
          {
            status: currentStatus + 1,
          }
        );
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      {!close && <Add setClose={setClose} />}
      <div className={styles.item}>
        <div className={styles.title}>
          <div className={styles.categoryTitle}>Orders</div>
        </div>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>
                  {order.customer}
                  <br />
                  {order._id.slice(0, 5)}..
                </td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    onClick={() => handleStatus(order._id)}
                    className={styles.button}
                  >
                    next stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          <div className={styles.categoryTitle}>Products</div>
          {admin && <AddButton setClose={setClose} />}
        </div>

        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {phoList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={100}
                    height={100}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>
                  <b>{product.title}</b>{" "}
                  <span className={styles.category}>{product.category}</span>
                  <br />
                  {product.desc}
                </td>
                <td>
                  {product.prices?.map((p) => (
                    <span key={p[0]}>
                      {p[0]}: <b>${p[1]} </b>
                      <br />
                    </span>
                  ))}
                </td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  } else if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(
    "https://phoxiclo.vercel.app/api/products"
  );
  const orderRes = await axios.get("https://phoxiclo.vercel.app/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
      admin,
    },
  };
};
export default Index;
