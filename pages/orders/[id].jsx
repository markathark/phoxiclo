import styles from "../../styles/Order.module.css";
import {
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaHourglassStart,
  FaPeopleCarry,
  FaHouseUser,
} from "react-icons/fa";
import axios from "axios";

const Order = ({ order }) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <div className={styles.title}>Order Status</div>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.trTitle}>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order._id}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{order.address}</span>
              </td>
              <td>
                <span className={styles.total}>${order.price}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <FaMoneyCheckAlt size="30" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <FaCheckCircle
                className={styles.checkedIcon}
                size="20"
                color="green"
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <FaHourglassStart size="30" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <FaCheckCircle
                className={styles.checkedIcon}
                size="20"
                color="green"
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <FaPeopleCarry size="30" />
            <span>On The Way</span>
            <div className={styles.checkedIcon}>
              <FaCheckCircle
                className={styles.checkedIcon}
                size="20"
                color="green"
              />
            </div>
          </div>
          <div className={statusClass(30)}>
            <FaHouseUser size="30" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <FaCheckCircle
                className={styles.checkedIcon}
                size="20"
                color="green"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            Your total is ${order.total} and has been paid.
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${order.total}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://phoxiclo.vercel.app/api/orders/${params.id}`
  );
  return {
    props: { order: res.data },
  };
};

export default Order;
